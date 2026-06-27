import express from "express";
import User from "../models/User.js";

const router = express.Router();

// SEARCH users by name (moved UP so it doesn't conflict with /:id)
router.get("/search/:name", async (req, res, next) => {
  try {
    const users = await User.find({
      name: { $regex: req.params.name, $options: "i" }
    });
    res.status(200).json(users);
  } catch (err) {
    console.error("Search error:", err); // ✅ log actual error
    next(err);
  }
});

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// GET single user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// POST create user
router.post("/", async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// PUT update user
router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// DELETE user
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
