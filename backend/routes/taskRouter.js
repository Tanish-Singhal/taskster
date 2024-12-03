const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const zod = require("zod");
const Task = require("../models/taskSchema");
const router = express.Router();

router.use(authMiddleware);

const taskSchema = zod.object({
  title: zod.string().min(5).max(30),
  description: zod.string().optional(),
  priority: zod.enum(["low", "medium", "high"]).default("low"),
  tags: zod.array(zod.string()).default([]),
  deadline: zod.string(),
});

router.post("/:columnId", async (req, res) => {
  try {
    const body = req.body;
    
    const result = taskSchema.safeParse(body);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Task validation failed",
      });
    }

    const newTask = await Task.create({
      ...result.data,
      columnId: req.params.columnId,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error while creating task",
    });
  }
});

router.get("/:columnId", async (req, res) => {
  try {
    const tasks = await Task.find({
      columnId: req.params.columnId,
    });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching Tasks",
    });
  }
});

router.put("/:taskId", async (req, res) => {
  const body = req.body;
  const result = taskSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.taskId, body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully", 
      task: updateTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating task",
    });
  }
});

router.put("/:taskId/column", async (req, res) => {
  try {
    const { columnId } = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { columnId },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task moved successfully",
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while moving task"
    });
  }
});

router.delete("/:taskId", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting task",
    });
  }
});

module.exports = router;
