const express = require("express");
const urlRoute = require("./routes/url");
const { connectToDB } = require("./connectDB");

const app = express();
const PORT = 8001;

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
