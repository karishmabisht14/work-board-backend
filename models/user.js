const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  userType: { type: String, enum: ["user", "admin"], default: "user" },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", UserSchema);
