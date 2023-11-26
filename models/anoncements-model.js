const mongoose = require("mongoose");

const anoncesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: null },
  finallyDate: { type: Date, default: null },
  finallyTime: { type: String, default: null },
  image: { type: String, default: null },
  isPinned: { type: Boolean, default: false },
  updatedAt: { type: Date, default: null },
});

module.exports = mongoose.model("Anonces", anoncesSchema);
