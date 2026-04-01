const adService = require("../services/ad.service");

const getReviewQueue = async (req, res, next) => {
  try {
    const queue = await adService.getReviewQueue();
    res.json({ success: true, data: queue });
  } catch (error) {
    next(error);
  }
};

const reviewAd = async (req, res, next) => {
  try {
    const result = await adService.reviewAd(parseInt(req.params.id), req.user.id, req.body);
    res.json({ success: true, data: result, message: `Ad ${req.body.action}d successfully.` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getReviewQueue, reviewAd };
