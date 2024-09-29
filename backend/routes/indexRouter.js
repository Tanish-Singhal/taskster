const express = require("express");
const authRouter = require("./authRouter");
const boardRouter = require("./boardRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/boards", boardRouter);

module.exports = router;
