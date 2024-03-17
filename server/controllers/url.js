const shortid = require('shortid');
const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const body = req.body;

  if (!body.longURL) {
    return res.status(400).json({
      msg: "URL is required",
    });
  }

  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.longURL,
    visitHistory: [],
  });

  return res.status(200).json({
    msg: "Short URL created successfully",
    shortURL: shortID,
  });
}

async function handleRedirectRoute(req, res) {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {
    $push: {
      visitHistory: {
        timestamp: Date.now()
      }
    }
  })
  if (!entry) {
    return res.status(400).json({
      msg: "Invalid Short URL"
    })
  }
  res.redirect(entry.redirectURL)
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId

  const result = await URL.findOne({ shortId: shortId })
  if (!result) {
    return res.status(400).json({
      msg: "Invalid Short URL"
    })
  }
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
  })
}

module.exports = {
  handleGenerateShortURL,
  handleRedirectRoute,
  handleAnalytics
};
