const mongoose = require("mongoose");
const { use } = require("express/lib/router");

const userSchema = new mongoose.Schema({
  name: string
});

module.exports = mongoose.model("User", userSchema);
