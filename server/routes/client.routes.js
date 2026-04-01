const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { createAdSchema, updateAdSchema, paymentSchema } = require("../validators/ad.validator");

// All client routes require authentication + client role
router.use(authenticate, authorize("client"));

// POST /api/client/ads - Create a new ad
router.post("/ads", validate(createAdSchema), clientController.createAd);

// PATCH /api/client/ads/:id - Update a draft ad
router.patch("/ads/:id", validate(updateAdSchema), clientController.updateAd);

// POST /api/client/ads/:id/submit - Submit ad for review
router.post("/ads/:id/submit", clientController.submitAd);

// GET /api/client/ads - Get all client's ads
router.get("/ads", clientController.getMyAds);

// GET /api/client/dashboard - Client dashboard stats
router.get("/dashboard", clientController.getDashboard);

// POST /api/client/payments - Submit payment
router.post("/payments", validate(paymentSchema), clientController.submitPayment);

module.exports = router;
