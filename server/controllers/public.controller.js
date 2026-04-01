const adService = require("../services/ad.service");

const getPublicAds = async (req, res, next) => {
  try {
    const { category, city, search, page, limit } = req.query;
    const result = await adService.getPublicAds({
      category: category ? parseInt(category) : null,
      city: city ? parseInt(city) : null,
      search,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 12,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getAdBySlug = async (req, res, next) => {
  try {
    const ad = await adService.getAdBySlug(req.params.slug);
    res.json({ success: true, data: ad });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPublicAds, getAdBySlug };
