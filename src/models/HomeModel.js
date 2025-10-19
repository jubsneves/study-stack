const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
});

const HomeModel = mongoose.model("Home", HomeSchema);

class Home {}

module.exports = Home;
