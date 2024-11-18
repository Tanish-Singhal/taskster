const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Column = require("./../models/columnSchema");
const Task = require("./../models/taskSchema"); // Add this import
const zod = require("zod");

const router = express.Router();

router.use(authMiddleware);

const columnSchema = zod.object({
  name: zod.string().min(3).max(20),
});

router.post("/:boardId", async (req, res) => {
  const body = req.body;
  const result = columnSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  try {
    const existingColumn = await Column.findOne({
      name: body.name,
      boardId: req.params.boardId,
    });

    if (existingColumn) {
      return res.status(400).json({
        success: false,
        message: "Column already exists",
      });
    }

    const newColumn = await Column.create({
      name: body.name,
      boardId: req.params.boardId,
    });

    res.status(200).json({
      success: true,
      message: "Column created successfully",
      column: newColumn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating column",
    });
  }
});

router.get("/:boardId", async (req, res) => {
  console.log(req);
  try {
    const column = await Column.find({
      boardId: req.params.boardId,
    }).populate("tasks");

    res.status(200).json({
      success: true,
      data: column,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching columns",
    });
  }
});

router.put("/:boardId/:columnId", async (req, res) => {
  const body = req.body;
  const result = columnSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  try {
    const updateColumn = await Column.findByIdAndUpdate(req.params.columnId, body, {
      new: true,
    });

    if (!updateColumn) {
      return res.status(404).json({
        success: false,
        message: "Column not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Column updated successfully",
      column: updateColumn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating column",
    });
  }
});

router.delete("/:columnId", async (req, res) => {
  try {
    const deletedColumn = await Column.findById(req.params.columnId);

    if (!deletedColumn) {
      return res.status(404).json({
        success: false,
        message: "Column not found",
      });
    }

    await Task.deleteMany({
      columnId: req.params.columnId,
    });

    await deletedColumn.deleteOne();

    res.status(200).json({
      success: true,
      message: "Column deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting column",
    });
  }
});

module.exports = router;
