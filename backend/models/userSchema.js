const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide a username"],
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [20, "Username must be at most 20 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      minLength: [6, "Email must be at least 6 characters long"],
      maxLength: [30, "Email must be at most 30 characters long"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [8, "Password must be at least 8 characters long"],
      maxLength: [100, "Password must be at most 100 characters long"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
