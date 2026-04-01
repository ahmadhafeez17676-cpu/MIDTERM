const adService = require("../services/ad.service");

const createAd = async (req, res, next) => {
  try {
    const ad = await adService.createAd(req.user.id, req.body);
    res.status(201).json({ success: true, data: ad });
  } catch (error) {
    next(error);
  }
};

const updateAd = async (req, res, next) => {
  try {
    const ad = await adService.updateAd(parseInt(req.params.id), req.user.id, req.body);
    res.json({ success: true, data: ad });
  } catch (error) {
    next(error);
  }
};

const submitAd = async (req, res, next) => {
  try {
    const ad = await adService.submitAd(parseInt(req.params.id), req.user.id);
    res.json({ success: true, data: ad, message: "Ad submitted for review." });
  } catch (error) {
    next(error);
  }
};

const getMyAds = async (req, res, next) => {
  try {
    const ads = await adService.getClientAds(req.user.id);
    res.json({ success: true, data: ads });
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await adService.getClientDashboard(req.user.id);
    res.json({ success: true, data: dashboard });
  } catch (error) {
    next(error);
  }
};

const submitPayment = async (req, res, next) => {
  try {
    const payment = await adService.submitPayment(req.user.id, req.body);
    res.status(201).json({ success: true, data: payment, message: "Payment submitted for verification." });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAd, updateAd, submitAd, getMyAds, getDashboard, submitPayment };
