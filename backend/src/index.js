const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const rateLimit = require("express-rate-limit");
const indexRouter = require("./../routes/indexRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(cors());
app.use(express.json());

app.use("/api", limiter);

app.use("/api/v1", indexRouter);

connectDB();

app.get("/healthy", (req, res) => {
  res.send("I am healthy");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
