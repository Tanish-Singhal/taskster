const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const zod = require("zod");
const Task = require("../models/taskSchema");
const router = express.Router();

router.use(authMiddleware);

const taskSchema = zod.object({
  title: zod.string().min(3).max(30),
  description: zod.string().optional(),
  priority: zod.enum(["low", "medium", "high"]).optional(),
  status: zod.string(),
  tags: zod.array(zod.string()).optional(),
  deadline: zod.date().optional(),
});

router.post("/:columnId", async (req, res) => {
  const body = req.body;
  const result = taskSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  try {
    const newTask = await Task.create({
      ...result.data,
      boardId: req.params.boardId,
    });

    res.status(200).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating task",
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

router.put("/:columnId/:taskId", async (req, res) => {
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

router.delete("/:columnId/:taskId", async (req, res) => {
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
