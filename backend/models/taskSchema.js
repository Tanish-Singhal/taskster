const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
      minLength: [5, "Task title must be at least 5 characters long"],
      maxLength: [30, "Task title must be at most 30 characters long"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    tags: {
      type: [String],
      default: [],
    },
    deadline: {
      type: String,
      required: [true, "Please provide a task deadline"],
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
