import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./Config/mongodb.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-auth-frontend-s2q3.onrender.com",
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/server
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error("CORS policy does not allow this origin"),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true, // important for cookies
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working fine");
});

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
