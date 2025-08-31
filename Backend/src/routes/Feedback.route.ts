import express from "express";

import { protect } from "../middlewares/protect.middleware";
import {
  createFeedback,
  getFeedbacks,
  upvoteFeedback,
} from "../controllers/Feedback.controller";

const router = express.Router();

// Create feedback
router.post("/", protect, createFeedback);

// Get all feedbacks (supports sort, filter, search, group via query params)
router.get("/", getFeedbacks);

// Upvote feedback
router.post("/:id/upvote", protect, upvoteFeedback);

export default router;
