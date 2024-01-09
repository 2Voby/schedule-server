const mongoose = require("mongoose");

const bellSchema = new mongoose.Schema({
  bells: { type: JSON, default: [] },
});

module.exports = mongoose.model("Bells", bellSchema);
