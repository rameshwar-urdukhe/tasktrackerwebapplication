const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const taskRoutes = require("./routes/task.routes");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tasktrackerwebapplication.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Tracker API is running 🚀",
  });
});

// API Routes
app.use("/api/tasks", taskRoutes);

module.exports = app;
