import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
} from "../controllers/authControllers.js";
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Email Verification
router.post("/send-verify-otp", userAuth, sendVerifyOtp);
router.post("/verify-email", userAuth, verifyEmail);

// Auth Check
router.get("/is-authenticated", userAuth, isAuthenticated);

// Password Reset
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router; // ✅ No extra parenthesis
