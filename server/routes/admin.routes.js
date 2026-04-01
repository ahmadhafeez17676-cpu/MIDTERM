const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { verifyPaymentSchema, publishAdSchema } = require("../validators/ad.validator");

// All admin routes require authentication + admin/super_admin role
router.use(authenticate, authorize("admin", "super_admin"));

// GET /api/admin/payment-queue
router.get("/payment-queue", adminController.getPaymentQueue);

// PATCH /api/admin/payments/:id/verify
router.patch("/payments/:id/verify", validate(verifyPaymentSchema), adminController.verifyPayment);

// PATCH /api/admin/ads/:id/publish
router.patch("/ads/:id/publish", validate(publishAdSchema), adminController.publishAd);

// GET /api/admin/analytics
router.get("/analytics", adminController.getAnalytics);

module.exports = router;
