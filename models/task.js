const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  isArchive: { type: Boolean, default: false },
  userId: { type: String, required: true },
  categoryId: { type: String, required: true },
  currentStage: { type: Number, enum: [1, 2, 3, 4], default: 1 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("task", TaskSchema);
