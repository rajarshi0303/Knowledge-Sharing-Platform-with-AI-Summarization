import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { requestLogger } from "./src/middleware/requestLogger.mjs";
import authRoutes from "./src/routes/authRoutes.mjs";
import articleRoutes from "./src/routes/articlesRoutes.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import { connectDB } from "./src/config/db.mjs";

//Connect to Database
connectDB();

const app = express();

//cores
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Secure Headers
app.use(helmet());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(requestLogger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
