const express = require("express");
const router = express.Router();
const publicController = require("../controllers/public.controller");

// GET /api/ads - Public listing with filters
router.get("/", publicController.getPublicAds);

// GET /api/ads/:slug - Single ad detail
router.get("/:slug", publicController.getAdBySlug);

module.exports = router;
