const adService = require("../services/ad.service");

const getPaymentQueue = async (req, res, next) => {
  try {
    const queue = await adService.getPaymentQueue();
    res.json({ success: true, data: queue });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const result = await adService.verifyPayment(parseInt(req.params.id), req.user.id, req.body);
    res.json({ success: true, data: result, message: `Payment ${req.body.action}d successfully.` });
  } catch (error) {
    next(error);
  }
};

const publishAd = async (req, res, next) => {
  try {
    const result = await adService.publishAd(parseInt(req.params.id), req.user.id, req.body);
    res.json({ success: true, data: result, message: `Ad action completed.` });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const analytics = await adService.getAnalytics();
    res.json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPaymentQueue, verifyPayment, publishAd, getAnalytics };
