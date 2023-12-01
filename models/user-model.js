const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  isAdmin: { type: Boolean, default: false },
  roles: { type: Array, default: [] },
});

module.exports = model("User", UserSchema);
