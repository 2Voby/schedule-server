const mongoose = require("mongoose");
// const { use } = require("express/lib/router");

const logsSchema = new mongoose.Schema({
  Date: String,
  OnlinePerDay: Number,
  Users: { type: String, default: "[]" },
});

module.exports = mongoose.model("Logs", logsSchema);
