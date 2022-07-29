const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: { type: String, default: null, unique: true },
  description: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  userId: { type: String, default: null },
  categoryId: { type: String, default: null },
  colorCode: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("board", BoardSchema);
