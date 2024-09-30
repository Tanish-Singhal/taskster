const express = require("express");
const zod = require("zod");
const Board = require("./../models/boardSchema");
const authMiddleware = require("./../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

const boardSchema = zod.object({
  name: zod.string().min(3).max(30),
});

router.post("/new", async (req, res) => {
  const body = req.body;

  const result = boardSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  try {
    const existingBoard = await Board.findOne({
      name: body.name,
      userId: req.userId,
    });

    const newBoard = await Board.create({
      name: body.name,
      userId: req.userId,
    });

    res.status(200).json({
      success: true,
      message: "Board created successfully",
      board: newBoard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating board",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const board = await Board.find({
      userId: req.userId,
    }).populate("columnId");

    res.status(200).json({
      success: true,
      data: board,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate("columnId");

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    res.status(200).json({
      success: true,
      data: board,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching board",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const boardId = req.params.id;

  try {
    const board = await Board.findOneAndDelete({
      _id: boardId,
      userId: req.userId,
    });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Board deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.put("/:id", async (req, res) => {
  const body = req.body;
  const result = boardSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      { name: body.name },
      { new: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Board updated successfully",
      board: updatedBoard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
