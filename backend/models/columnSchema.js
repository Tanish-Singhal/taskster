const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a column name"],
      minLength: [3, "Column name must be at least 3 characters long"],
      maxLength: [20, "Column name must be at most 20 characters long"],
      unique: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

columnSchema.index({ boardId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Column", columnSchema);
