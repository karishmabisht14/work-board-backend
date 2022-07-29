const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: { type: String, default: null, unique: true },
  description: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  isArchive: { type: Boolean, default: false },
  userId: { type: String, default: null },
  categoryId: { type: String, default: null },
  boardId: { type: String, default: null },
  currentStage: { type: Number, enum: [1, 2, 3, 4, 5], default: 1 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("task", TaskSchema);
