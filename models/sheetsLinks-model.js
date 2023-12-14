const mongoose = require("mongoose");

const sheetLinksSchema = new mongoose.Schema({
  allowedForRoles: { type: Array, default: ["ADMIN"] },
  link: { type: String, default: "" },
  group: { type: String, default: "" },
});

module.exports = mongoose.model("sheetLinks", sheetLinksSchema);
