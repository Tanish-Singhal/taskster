const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a board name"],
      minLength: [1, "Board name must be at least 1 character long"],
      maxLength: [20, "Board name must be at most 20 characters long"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    columnId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  { timestamps: true }
);

boardSchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Board", boardSchema);
