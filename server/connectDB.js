const mongoose = require("mongoose");

async function connectToDB() {
  return mongoose.connect('mongodb+srv://adeebsiddiqui77:Dr1c2VmeloGS6zqc@cluster0.69tib9x.mongodb.net/');
}

module.exports = {
  connectToDB,
};
