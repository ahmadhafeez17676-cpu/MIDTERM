const express = require("express");
const router = express.Router();
const moderatorController = require("../controllers/moderator.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { reviewAdSchema } = require("../validators/ad.validator");

// All moderator routes require authentication + moderator/admin role
router.use(authenticate, authorize("moderator", "admin", "super_admin"));

// GET /api/moderator/review-queue
router.get("/review-queue", moderatorController.getReviewQueue);

// PATCH /api/moderator/ads/:id/review
router.patch("/ads/:id/review", validate(reviewAdSchema), moderatorController.reviewAd);

module.exports = router;
