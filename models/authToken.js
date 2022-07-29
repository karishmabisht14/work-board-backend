const mongoose = require("mongoose");

const AuthTokenSchema = new mongoose.Schema({
  token: { type: String, unique: true },
  userId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("auth-token", AuthTokenSchema);
