const express = require("express");
const { handleGenerateShortURL, handleRedirectRoute, handleAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortURL);
router.get("/:shortId", handleRedirectRoute)
router.get('/analytics/:shortId', handleAnalytics)

module.exports = router;
