import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userController.js"; // ✅ Add `.js` here too if it's a local file

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

export default userRouter;
