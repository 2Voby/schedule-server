const mongoose = require("mongoose");

const bellSchema = new mongoose.Schema({
  bells: { type: Array, default: [] },
});

module.exports = mongoose.model("Bells", bellSchema);
