const { z } = require("zod");

const createAdSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  description: z.string().min(20, "Description must be at least 20 characters").max(5000),
  category_id: z.number().int().positive("Category is required"),
  city_id: z.number().int().positive("City is required"),
  package_id: z.number().int().positive("Package is required"),
  image_url: z.string().url("Must be a valid URL").optional(),
  contact_url: z.string().url("Must be a valid URL").optional(),
});

const updateAdSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  description: z.string().min(20).max(5000).optional(),
  category_id: z.number().int().positive().optional(),
  city_id: z.number().int().positive().optional(),
  image_url: z.string().url().optional(),
  contact_url: z.string().url().optional(),
});

const paymentSchema = z.object({
  ad_id: z.number().int().positive("Ad ID is required"),
  amount: z.number().positive("Amount must be positive"),
  method: z.string().min(1, "Payment method is required"),
  transaction_ref: z.string().min(3, "Transaction reference is required"),
  sender_name: z.string().min(2, "Sender name is required"),
  screenshot_url: z.string().url("Must be a valid screenshot URL"),
});

const reviewAdSchema = z.object({
  action: z.enum(["approve", "reject"]),
  notes: z.string().optional(),
});

const verifyPaymentSchema = z.object({
  action: z.enum(["verify", "reject"]),
  notes: z.string().optional(),
});

const publishAdSchema = z.object({
  action: z.enum(["publish", "schedule", "feature"]),
  scheduled_at: z.string().datetime().optional(),
  admin_boost: z.number().min(0).max(100).optional(),
});

module.exports = {
  createAdSchema,
  updateAdSchema,
  paymentSchema,
  reviewAdSchema,
  verifyPaymentSchema,
  publishAdSchema,
};
