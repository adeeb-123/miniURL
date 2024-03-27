const shortid = require("shortid");
const URL = require("../models/url");
const axios = require("axios");

async function handleGenerateShortURL(req, res) {
  const body = req.body;

  const ipAddress = req.ip;
  let country = '';

  // Make a request to ipinfo.io to get geolocation data
  try {
    const response = await axios.get(
      `https://ipinfo.io/${ipAddress}?token=f74b9f9f449d65`
    );
    const data = response.data;

    console.log(data); // Log the data received
    country = data.country
  } catch (error) {
    console.error(error); // Log the error
  }

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
    countryName : country
  });
}

async function handleRedirectRoute(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(400).json({
      msg: "Invalid Short URL",
    });
  }
  res.redirect(entry.redirectURL);
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId: shortId });
  if (!result) {
    return res.status(400).json({
      msg: "Invalid Short URL",
    });
  }
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateShortURL,
  handleRedirectRoute,
  handleAnalytics,
};
