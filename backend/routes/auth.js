import passport from "passport";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";   // still here if you want reset token later
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import transporter from "../utils/mailer.js";
const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    message:
      "Too many authentication attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
// Signup
router.post(
  "/signup",
  authLimiter,
  [
    body("name").notEmpty().withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],

  async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {

      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {

        return res.status(400).json({
          message: "Email already registered",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
      });

    } catch (err) {
      next(err);
    }

  }
);

// Login
router.post(
  "/login",
  authLimiter,
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .notEmpty()
      .withMessage("Password required"),
  ],

  async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
  errors: errors.array(),
});
    }

    try {

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        token,
      });

    } catch (err) {
      next(err);
    }

  }
);

// Forgot Password (disabled for now)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink =
      `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `
        <h2>Password Reset</h2>

        <p>Click the button below to reset your password.</p>

        <a href="${resetLink}">
          Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.json({
      message: "Password reset link sent to your email.",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
// Get Logged-in User Profile
router.get("/profile", auth, async (req, res) => {
  try {

const user = await User.findById(req.user.id).select("-password");


if(user && !user.role){
  user.role = "Production Manager";
}

if(user && !user.organization){
  user.organization = "Alaknanda Herbal & Essential Oil Distillers";
}

await user.save();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});
// ---------------- GOOGLE LOGIN ----------------

// Redirect user to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: true,
  }),

  (req, res) => {

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(
      `http://localhost:3000/google-success?token=${token}`
    );

  }
);
// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({
      message: "Password reset successfully.",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
export default router;
