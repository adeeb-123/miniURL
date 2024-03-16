import { nanoid } from "nanoid";
const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      msg: "URL is required",
    });
  }

  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
  });

  return res.status(200).json({
    msg: "Short URL created successfully",
    shortURL: shortID,
  });
}

module.exports = {
  handleGenerateShortURL,
};
