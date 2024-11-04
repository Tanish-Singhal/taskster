const express = require("express");
const zod = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userSchema");
const authMiddleware = require("../middleware/authMiddleware");

dotenv.config();

const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().min(3).max(20),
  email: zod.string().email().min(6).max(30),
  password: zod.string().min(8).max(100),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors: result.error.errors,
    });
  }

  const existingUserByEmail = await User.findOne({ email: body.email });
  if (existingUserByEmail) {
    return res.status(400).json({
      success: false,
      message: "Email already in use",
    });
  }

  const existingUserByUsername = await User.findOne({ username: body.username });
  if (existingUserByUsername) {
    return res.status(400).json({
      success: false,
      message: "Username already in use",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  try {
    const newUser = await User.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });
    const userId = newUser._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while creating account",
      error: "Internal Server Error",
    });
  }
});

const signinSchema = zod.object({
  email: zod.string().email().min(6).max(30),
  password: zod.string().min(8).max(100),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const result = signinSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors: result.error.errors,
    });
  }

  try {
    const existingUser = await User.findOne({
      email: body.email,
    });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(body.password, existingUser.password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const userId = existingUser._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",

      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging in",
      error: "Internal Server Error",
    });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      user: {
        username: user.username,
        email: user.email,
      }
    });
  } catch(error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching user",
      error: "Internal Server Error",
    });
  }
})

const updateUserSchema = zod.object({
  username: zod.string().min(3).max(20).optional(),
  email: zod.string().email().min(6).max(30).optional(),
  currentPassword: zod.string().min(8).max(100).optional(),
  newPassword: zod.string().min(8).max(100).optional(),
}).refine((data) => {
  if (data.currentPassword || data.newPassword) {
    return data.currentPassword && data.newPassword;
  }
  return true;
}, {
  message: "Both current password and new password are required for password update"
});

router.put("/update", authMiddleware, async (req, res) => {
  const body = req.body;
  const result = updateUserSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors: result.error.errors,
    });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (body.username && body.username !== user.username) {
      const existingUser = await User.findOne({ username: body.username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }
    }

    if (body.email && body.email !== user.email) {
      const existingUser = await User.findOne({ email: body.email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
    }

    if (body.currentPassword && body.newPassword) {
      const validPassword = await bcrypt.compare(body.currentPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.newPassword, salt);
      user.password = hashedPassword;
    }

    if (body.username) user.username = body.username;
    if (body.email) user.email = body.email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
