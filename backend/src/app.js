const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const taskRoutes = require("./routes/task.routes");


const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://tasktrackerwebapplication.vercel.app",
];

app.use(
  cors({
<<<<<<< HEAD
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
=======
    origin: [
      "http://localhost:5173",
      "https://tasktrackerwebapplication.vercel.app/",
    ],
>>>>>>> de386277bfca7f075f545fea764189118e342fdd
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
