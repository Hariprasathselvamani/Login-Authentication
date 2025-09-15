import express from "express";
import {
  register,
  login,
  logout,
  isAuthenticated,
  sendVerifyOtp,
  verifyEmail,
  sendResetOtp,
  resetPassword,
} from "../controllers/authController.js";
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/is-authenticated", userAuth, isAuthenticated);
router.post("/send-verify-otp", userAuth, sendVerifyOtp);
router.post("/verify-email", userAuth, verifyEmail);
router.post("/logout", userAuth, logout);

export default router;
