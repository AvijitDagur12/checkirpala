import express from "express";
import multer from "multer";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// multer setup for photo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads folder in server
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/register
router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, phone, village, password } = req.body;

    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      village,
      password: hashedPassword,
      photo: req.file ? req.file.filename : null,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

export default router;
