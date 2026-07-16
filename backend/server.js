import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import errorHandler from "./middleware/errorHandler.js";
import batchRoutes from "./routes/batches.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import rateLimit from "express-rate-limit";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import chatRoutes from "./routes/chat.js";
const app = express();
const authLimiter = rateLimit({
  windowMs:  15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    message:
      "Too many authentication attempts. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later."
});
app.use(cors());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());
app.use(express.json({ limit: "50mb" }));
app.use(limiter);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
// Error handler
app.use(errorHandler);

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error(err));
