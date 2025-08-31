import { Request, Response } from "express";
import Feedback from "../models/Feedback.model";
import { SortOrder } from "mongoose";

// Create feedback
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!["Bug", "Improvement", "Feature"].includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }
    console.log((req as any).user);
    const userId = (req as any).user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const feedback = await Feedback.create({
      user: userId,
      title,
      description,
      category,
    });

    res.status(201).json({
      message: "Feedback created successfully",
      feedback,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all feedbacks

export const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const { sortBy, category, search, groupBy } = req.query;

    // --- Sorting ---
    let sortOption: Record<string, SortOrder> = { createdAt: "desc" }; // default newest
    if (sortBy === "oldest") {
      sortOption = { createdAt: "asc" };
    }

    // --- Filtering ---
    const filter: any = {};
    if (category) {
      filter.category = category; // e.g., "Bug" | "Feature" | "Improvement"
    }
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // --- Normal Query ---
    const feedbacks = await Feedback.find(filter)
      .populate("user", "name email") // get user details
      .sort(sortOption);

    // --- Grouping (if needed) ---
    if (groupBy === "category") {
      // group in backend by category
      const grouped: Record<string, typeof feedbacks> = {};
      feedbacks.forEach((fb) => {
        if (!grouped[fb.category]) grouped[fb.category] = [];
        grouped[fb.category].push(fb);
      });

      return res.json({ grouped });
    }

    res.json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Upvote feedback
export const upvoteFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    const userId = (req as any).user._id;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // check if already upvoted
    const alreadyUpvoted = feedback.upvoters.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyUpvoted) {
      // remove upvote
      feedback.upvoters = feedback.upvoters.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // add upvote
      feedback.upvoters.push(userId);
    }

    await feedback.save();

    res.status(200).json({
      ...feedback.toObject(),
      upvotes: feedback.upvoters.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
