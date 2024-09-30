const express = require("express");
const authRouter = require("./authRouter");
const boardRouter = require("./boardRouter");
const columnRouter = require("./columnRouter");
const taskRouter = require("./taskRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/boards", boardRouter);
router.use("/columns", columnRouter);
router.use("/tasks", taskRouter);

module.exports = router;
