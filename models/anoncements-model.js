const mongoose = require("mongoose");

const anoncesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: null },
  finnalyDate: { type: Date, default: null },
  finnalyTime: { type: String, default: null },
  image: { type: String, default: null },
});

module.exports = mongoose.model("Anonces", anoncesSchema);
