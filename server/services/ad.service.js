const { supabase } = require("../db/supabase");

// Ad status constants
const AD_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_SUBMITTED: "payment_submitted",
  PAYMENT_VERIFIED: "payment_verified",
  SCHEDULED: "scheduled",
  PUBLISHED: "published",
  EXPIRED: "expired",
};

/**
 * Create a new ad (Client)
 */
const createAd = async (userId, adData) => {
  const slug = adData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .from("ads")
    .insert({
      ...adData,
      user_id: userId,
      slug: `${slug}-${Date.now()}`,
      status: AD_STATUS.DRAFT,
    })
    .select("*")
    .single();

  if (error) throw { status: 500, message: "Failed to create ad.", detail: error.message };

  // Log status history
  await logStatusChange(data.id, null, AD_STATUS.DRAFT, userId, "Ad created");

  return data;
};

/**
 * Update an existing ad (Client - only drafts)
 */
const updateAd = async (adId, userId, updateData) => {
  // Verify ownership and draft status
  const { data: ad } = await supabase
    .from("ads")
    .select("*")
    .eq("id", adId)
    .eq("user_id", userId)
    .single();

  if (!ad) throw { status: 404, message: "Ad not found or not authorized." };
  if (ad.status !== AD_STATUS.DRAFT) {
    throw { status: 400, message: "Only draft ads can be edited." };
  }

  const { data, error } = await supabase
    .from("ads")
    .update(updateData)
    .eq("id", adId)
    .select("*")
    .single();

  if (error) throw { status: 500, message: "Failed to update ad.", detail: error.message };

  return data;
};

/**
 * Submit ad for review (Client: draft → submitted)
 */
const submitAd = async (adId, userId) => {
  const { data: ad } = await supabase
    .from("ads")
    .select("*")
    .eq("id", adId)
    .eq("user_id", userId)
    .single();

  if (!ad) throw { status: 404, message: "Ad not found or not authorized." };
  if (ad.status !== AD_STATUS.DRAFT) {
    throw { status: 400, message: "Only draft ads can be submitted." };
  }

  const { data, error } = await supabase
    .from("ads")
    .update({ status: AD_STATUS.SUBMITTED })
    .eq("id", adId)
    .select("*")
    .single();

  if (error) throw { status: 500, message: "Failed to submit ad." };

  await logStatusChange(adId, AD_STATUS.DRAFT, AD_STATUS.SUBMITTED, userId, "Ad submitted for review");

  return data;
};

/**
 * Get all ads for a client
 */
const getClientAds = async (userId) => {
  const { data, error } = await supabase
    .from("ads")
    .select("*, packages(name, duration_days), categories(name), cities(name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw { status: 500, message: "Failed to fetch ads." };

  return data;
};

/**
 * Get client dashboard stats
 */
const getClientDashboard = async (userId) => {
  const { data: ads } = await supabase
    .from("ads")
    .select("id, status, views_count")
    .eq("user_id", userId);

  const total = ads?.length || 0;
  const published = ads?.filter((a) => a.status === AD_STATUS.PUBLISHED).length || 0;
  const underReview = ads?.filter((a) => [AD_STATUS.SUBMITTED, AD_STATUS.UNDER_REVIEW].includes(a.status)).length || 0;
  const totalViews = ads?.reduce((sum, a) => sum + (a.views_count || 0), 0) || 0;

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    stats: { total, published, underReview, totalViews },
    recentNotifications: notifications || [],
  };
};

/**
 * Review ad (Moderator)
 */
const reviewAd = async (adId, moderatorId, { action, notes }) => {
  const { data: ad } = await supabase
    .from("ads")
    .select("*")
    .eq("id", adId)
    .in("status", [AD_STATUS.SUBMITTED, AD_STATUS.UNDER_REVIEW])
    .single();

  if (!ad) throw { status: 404, message: "Ad not found or not in reviewable state." };

  const newStatus = action === "approve" ? AD_STATUS.PAYMENT_PENDING : AD_STATUS.DRAFT;

  const { data, error } = await supabase
    .from("ads")
    .update({ status: newStatus, moderator_notes: notes || null })
    .eq("id", adId)
    .select("*")
    .single();

  if (error) throw { status: 500, message: "Failed to review ad." };

  await logStatusChange(adId, ad.status, newStatus, moderatorId, `Moderator ${action}: ${notes || "No notes"}`);

  // Send notification to client
  await supabase.from("notifications").insert({
    user_id: ad.user_id,
    message: action === "approve"
      ? `Your ad "${ad.title}" has been approved! Please submit payment.`
      : `Your ad "${ad.title}" was rejected. Reason: ${notes || "Not specified"}`,
    type: action === "approve" ? "success" : "error",
  });

  return data;
};

/**
 * Get review queue (Moderator)
 */
const getReviewQueue = async () => {
  const { data, error } = await supabase
    .from("ads")
    .select("*, users(name, email), packages(name), categories(name), cities(name)")
    .in("status", [AD_STATUS.SUBMITTED, AD_STATUS.UNDER_REVIEW])
    .order("created_at", { ascending: true });

  if (error) throw { status: 500, message: "Failed to fetch review queue." };

  return data;
};

/**
 * Verify payment (Admin)
 */
const verifyPayment = async (paymentId, adminId, { action, notes }) => {
  const { data: payment } = await supabase
    .from("payments")
    .select("*, ads(id, title, user_id, status)")
    .eq("id", paymentId)
    .eq("status", "pending")
    .single();

  if (!payment) throw { status: 404, message: "Payment not found or already processed." };

  const paymentStatus = action === "verify" ? "verified" : "rejected";

  // Update payment
  await supabase
    .from("payments")
    .update({ status: paymentStatus, verified_by: adminId, verified_at: new Date().toISOString(), notes })
    .eq("id", paymentId);

  // Update ad status
  if (action === "verify") {
    await supabase
      .from("ads")
      .update({ status: AD_STATUS.PAYMENT_VERIFIED })
      .eq("id", payment.ad_id);

    await logStatusChange(payment.ad_id, AD_STATUS.PAYMENT_SUBMITTED, AD_STATUS.PAYMENT_VERIFIED, adminId, "Payment verified by admin");
  }

  // Notify client
  await supabase.from("notifications").insert({
    user_id: payment.ads.user_id,
    message: action === "verify"
      ? `Payment for "${payment.ads.title}" has been verified! Your ad will be published soon.`
      : `Payment for "${payment.ads.title}" was rejected. ${notes || ""}`,
    type: action === "verify" ? "success" : "error",
  });

  return { paymentId, status: paymentStatus };
};

/**
 * Publish ad (Admin)
 */
const publishAd = async (adId, adminId, { action, scheduled_at, admin_boost }) => {
  const { data: ad } = await supabase
    .from("ads")
    .select("*, packages(duration_days)")
    .eq("id", adId)
    .eq("status", AD_STATUS.PAYMENT_VERIFIED)
    .single();

  if (!ad) throw { status: 404, message: "Ad not found or not ready for publishing." };

  let updateData = {};

  if (action === "publish") {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (ad.packages?.duration_days || 7) * 24 * 60 * 60 * 1000);
    updateData = {
      status: AD_STATUS.PUBLISHED,
      published_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      admin_boost: admin_boost || 0,
    };
  } else if (action === "schedule") {
    updateData = {
      status: AD_STATUS.SCHEDULED,
      scheduled_at: scheduled_at,
      admin_boost: admin_boost || 0,
    };
  } else if (action === "feature") {
    updateData = { featured: true, admin_boost: admin_boost || 50 };
  }

  const { data, error } = await supabase
    .from("ads")
    .update(updateData)
    .eq("id", adId)
    .select("*")
    .single();

  if (error) throw { status: 500, message: "Failed to publish ad." };

  await logStatusChange(adId, AD_STATUS.PAYMENT_VERIFIED, updateData.status || ad.status, adminId, `Admin action: ${action}`);

  // Notify client
  await supabase.from("notifications").insert({
    user_id: ad.user_id,
    message: `Your ad "${ad.title}" has been ${action === "feature" ? "featured" : action + "ed"}!`,
    type: "success",
  });

  return data;
};

/**
 * Get payment queue (Admin)
 */
const getPaymentQueue = async () => {
  const { data, error } = await supabase
    .from("payments")
    .select("*, ads(title, user_id, status), users:ads(users(name, email))")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) throw { status: 500, message: "Failed to fetch payment queue." };

  return data;
};

/**
 * Get public ads (ranked by antigravity engine)
 */
const getPublicAds = async ({ category, city, search, page = 1, limit = 12 }) => {
  let query = supabase
    .from("ads")
    .select("id, title, slug, description, image_url, featured, published_at, views_count, packages(name, weight), categories(name), cities(name)", { count: "exact" })
    .eq("status", AD_STATUS.PUBLISHED)
    .lte("published_at", new Date().toISOString());

  if (category) query = query.eq("category_id", category);
  if (city) query = query.eq("city_id", city);
  if (search) query = query.ilike("title", `%${search}%`);

  const from = (page - 1) * limit;
  query = query.range(from, from + limit - 1);

  const { data, error, count } = await query;

  if (error) throw { status: 500, message: "Failed to fetch ads." };

  // Apply antigravity ranking
  const rankedAds = (data || [])
    .map((ad) => ({
      ...ad,
      rankScore: calculateRankScore(ad),
    }))
    .sort((a, b) => b.rankScore - a.rankScore);

  return { ads: rankedAds, total: count, page, limit };
};

/**
 * Get single ad by slug
 */
const getAdBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("ads")
    .select("*, packages(name, duration_days, weight), categories(name), cities(name), users(name), ad_media(url, type)")
    .eq("slug", slug)
    .eq("status", AD_STATUS.PUBLISHED)
    .single();

  if (!data) throw { status: 404, message: "Ad not found." };

  // Increment view count
  await supabase
    .from("ads")
    .update({ views_count: (data.views_count || 0) + 1 })
    .eq("id", data.id);

  return { ...data, rankScore: calculateRankScore(data) };
};

/**
 * Submit payment (Client)
 */
const submitPayment = async (userId, paymentData) => {
  // Verify ad ownership and status
  const { data: ad } = await supabase
    .from("ads")
    .select("*")
    .eq("id", paymentData.ad_id)
    .eq("user_id", userId)
    .eq("status", AD_STATUS.PAYMENT_PENDING)
    .single();

  if (!ad) throw { status: 404, message: "Ad not found or not in payment pending state." };

  // Check for duplicate transaction ref
  const { data: existingPayment } = await supabase
    .from("payments")
    .select("id")
    .eq("transaction_ref", paymentData.transaction_ref)
    .single();

  if (existingPayment) throw { status: 409, message: "This transaction reference has already been used." };

  // Create payment
  const { data: payment, error } = await supabase
    .from("payments")
    .insert({
      ...paymentData,
      user_id: userId,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) throw { status: 500, message: "Failed to submit payment." };

  // Update ad status
  await supabase
    .from("ads")
    .update({ status: AD_STATUS.PAYMENT_SUBMITTED })
    .eq("id", paymentData.ad_id);

  await logStatusChange(paymentData.ad_id, AD_STATUS.PAYMENT_PENDING, AD_STATUS.PAYMENT_SUBMITTED, userId, "Payment submitted");

  return payment;
};

/**
 * Get admin analytics
 */
const getAnalytics = async () => {
  const { data: ads } = await supabase.from("ads").select("status, views_count, featured, package_id");
  const { data: payments } = await supabase.from("payments").select("amount, status");
  const { data: users } = await supabase.from("users").select("role");

  const totalRevenue = payments
    ?.filter((p) => p.status === "verified")
    .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

  const totalViews = ads?.reduce((sum, a) => sum + (a.views_count || 0), 0) || 0;

  const statusBreakdown = {};
  ads?.forEach((a) => {
    statusBreakdown[a.status] = (statusBreakdown[a.status] || 0) + 1;
  });

  return {
    totalRevenue,
    totalAds: ads?.length || 0,
    totalUsers: users?.length || 0,
    totalViews,
    statusBreakdown,
    activeAds: ads?.filter((a) => a.status === AD_STATUS.PUBLISHED).length || 0,
  };
};

// ─── Helpers ─────────────────────────────────────────────

/**
 * Antigravity Ranking Engine
 */
function calculateRankScore(ad) {
  const featuredBonus = ad.featured ? 50 : 0;
  const packageWeight = (ad.packages?.weight || 1) * 10;
  const adminBoost = ad.admin_boost || 0;

  // Freshness: ads published recently get a boost (max 20 points, decays over 7 days)
  let freshnessPoints = 0;
  if (ad.published_at) {
    const ageMs = Date.now() - new Date(ad.published_at).getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    freshnessPoints = Math.max(0, 20 - ageDays * (20 / 7));
  }

  return Math.round(featuredBonus + packageWeight + freshnessPoints + adminBoost);
}

/**
 * Log status change in ad_status_history
 */
async function logStatusChange(adId, fromStatus, toStatus, changedBy, notes) {
  await supabase.from("ad_status_history").insert({
    ad_id: adId,
    from_status: fromStatus,
    to_status: toStatus,
    changed_by: changedBy,
    notes,
  });
}

module.exports = {
  createAd,
  updateAd,
  submitAd,
  getClientAds,
  getClientDashboard,
  reviewAd,
  getReviewQueue,
  verifyPayment,
  publishAd,
  getPaymentQueue,
  getPublicAds,
  getAdBySlug,
  submitPayment,
  getAnalytics,
  AD_STATUS,
};
