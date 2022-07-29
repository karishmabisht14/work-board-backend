const mongoose = require("mongoose");

const BoardCategorySchema = new mongoose.Schema({
  name: { type: String, default: null, unique: true },
  description: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("board-category", BoardCategorySchema);
