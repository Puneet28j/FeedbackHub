import express from "express";
import { loginUser, registerUser } from "../controllers/User.controller";
import { protect } from "../middlewares/protect.middleware";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Example protected route
router.get("/me", protect, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
