const shortid = require("shortid");
const URL = require("../models/url");
const axios = require("axios");

async function handleGenerateShortURL(req, res) {
  const body = req.body;

  const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let country = '';
  
  try {
    const response = await axios.get(`https://freegeoip.app/json/${ipAddress}`);
    const data = response.data;

    if (data.country_code) {
      country = data.country_name
      console.log('country' , country)
    } else {
      country = 'Country information not available'
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving geolocation data");
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
    countryName: country,
    ip: ipAddress,
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
