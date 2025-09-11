import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./Config/mongodb.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to DB
connectDB();
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-auth-frontend-s2q3.onrender.com",
];

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or server requests
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// API Endpoints
app.get("/", (req, res) => {
  res.send("API Working fine");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
