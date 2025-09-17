import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./Config/mongodb.js";
import userRouter from "./routes/userRoutes.js";

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", // local frontend
  process.env.FRONTEND_URL, // deployed frontend
].filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
); // adjust frontend URL

app.get("/", (req, res) => res.send("API Working"));

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "API route not found" });
});

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
