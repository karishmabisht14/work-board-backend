const mongoose = require("mongoose");

const BoardCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: null },
  categoryCode: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  stages: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("board-category", BoardCategorySchema);
