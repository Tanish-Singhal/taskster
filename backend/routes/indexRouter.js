const express = require("express");
const authRouter = require("./authRouter");
const boardRouter = require("./boardRouter");
const columnRouter = require("./columnRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/boards", boardRouter);
router.use("/columns", columnRouter);

module.exports = router;
