const express = require("express");
const urlRoute = require("./routes/url");
const { connectToDB } = require("./connectDB");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8001;

// connectDB
connectToDB().then(() => console.log("MongoDB Connected"));

app.use(express.json())
app.use(bodyParser.json())
app.use(cors());

app.use("/", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
