const mongoose = require("mongoose");

const BoardCategorySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: { type: String, default: null },
  categoryCode: { type: String, unique: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("board-category", BoardCategorySchema);
