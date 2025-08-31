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
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Auth routes

app.use("/api/feedbacks", feedbackRoutes); // Feedback routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
