const cron = require("node-cron");
const { supabase } = require("../db/supabase");

/**
 * Initialize all cron jobs
 */
const initCronJobs = () => {
  console.log("⏰ Initializing cron jobs...");

  // 1. Auto-publish scheduled ads — runs every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date().toISOString();

      const { data: scheduledAds, error } = await supabase
        .from("ads")
        .select("id, title, user_id, package_id, packages(duration_days)")
        .eq("status", "scheduled")
        .lte("scheduled_at", now);

      if (error || !scheduledAds?.length) return;

      for (const ad of scheduledAds) {
        const expiresAt = new Date(
          Date.now() + (ad.packages?.duration_days || 7) * 24 * 60 * 60 * 1000
        ).toISOString();

        await supabase
          .from("ads")
          .update({
            status: "published",
            published_at: now,
            expires_at: expiresAt,
          })
          .eq("id", ad.id);

        // Log status change
        await supabase.from("ad_status_history").insert({
          ad_id: ad.id,
          from_status: "scheduled",
          to_status: "published",
          changed_by: null,
          notes: "Auto-published by cron job",
        });

        // Notify client
        await supabase.from("notifications").insert({
          user_id: ad.user_id,
          message: `Your ad "${ad.title}" is now live!`,
          type: "success",
        });

        console.log(`✅ Auto-published: ${ad.title}`);
      }
    } catch (err) {
      console.error("Cron [auto-publish] error:", err.message);
    }
  });

  // 2. Auto-expire ads — runs every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    try {
      const now = new Date().toISOString();

      const { data: expiredAds, error } = await supabase
        .from("ads")
        .select("id, title, user_id")
        .eq("status", "published")
        .lte("expires_at", now);

      if (error || !expiredAds?.length) return;

      for (const ad of expiredAds) {
        await supabase
          .from("ads")
          .update({ status: "expired" })
          .eq("id", ad.id);

        await supabase.from("ad_status_history").insert({
          ad_id: ad.id,
          from_status: "published",
          to_status: "expired",
          changed_by: null,
          notes: "Auto-expired by cron job",
        });

        await supabase.from("notifications").insert({
          user_id: ad.user_id,
          message: `Your ad "${ad.title}" has expired. Renew to keep it live.`,
          type: "warning",
        });

        console.log(`⏰ Auto-expired: ${ad.title}`);
      }
    } catch (err) {
      console.error("Cron [auto-expire] error:", err.message);
    }
  });

  // 3. Expiry warning notifications — runs every hour
  cron.schedule("0 * * * *", async () => {
    try {
      const in48Hours = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
      const now = new Date().toISOString();

      const { data: soonExpiring } = await supabase
        .from("ads")
        .select("id, title, user_id, expires_at")
        .eq("status", "published")
        .gt("expires_at", now)
        .lte("expires_at", in48Hours);

      if (!soonExpiring?.length) return;

      for (const ad of soonExpiring) {
        // Check if we already sent a warning
        const { data: existing } = await supabase
          .from("notifications")
          .select("id")
          .eq("user_id", ad.user_id)
          .ilike("message", `%${ad.title}%expiring%`)
          .single();

        if (!existing) {
          await supabase.from("notifications").insert({
            user_id: ad.user_id,
            message: `Your ad "${ad.title}" is expiring within 48 hours! Consider renewing.`,
            type: "warning",
          });
          console.log(`⚠️ Expiry warning sent: ${ad.title}`);
        }
      }
    } catch (err) {
      console.error("Cron [expiry-warning] error:", err.message);
    }
  });

  // 4. System health log — runs every 6 hours
  cron.schedule("0 */6 * * *", async () => {
    try {
      const { count: adsCount } = await supabase.from("ads").select("*", { count: "exact", head: true });
      const { count: usersCount } = await supabase.from("users").select("*", { count: "exact", head: true });

      await supabase.from("audit_logs").insert({
        action: "system_health_check",
        details: JSON.stringify({
          timestamp: new Date().toISOString(),
          total_ads: adsCount,
          total_users: usersCount,
          status: "healthy",
        }),
      });

      console.log(`🏥 System health check: ${adsCount} ads, ${usersCount} users`);
    } catch (err) {
      console.error("Cron [health-check] error:", err.message);
    }
  });

  console.log("✅ All cron jobs initialized.");
};

module.exports = { initCronJobs };
