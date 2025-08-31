import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/User.route";
import feedbackRoutes from "./routes/Feedback.route";
import cors from "cors";
import connectDB from "./utils/db";

dotenv.config();

// Connect to MongoDB
connectDB();
const app = express();

// Prevent idling on free hosting on render free tier
const url = `https://feedbackhub-mx6f.onrender.com`;
const interval = 30000;

const reload = async () => {
  try {
    await fetch(url);
    console.log(`Reloaded: ${new Date().toISOString()}`);
  } catch (error) {
    console.error("Error reloading:", error);
  }
};

setInterval(reload, interval);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

app.use("/api/auth", authRoutes); // Auth routes

app.use("/api/feedbacks", feedbackRoutes); // Feedback routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
