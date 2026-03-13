import express from "express";
import multer from "multer";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
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


// contact support
// Contact Schema (add this at the top with other schemas)
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    default: null
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['certificate', 'scheme', 'complaint', 'water', 'road', 'other'],
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// POST - Save contact form
router.post('/contact', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, subject and message are required'
      });
    }

    const contactData = {
      name,
      email: email || null,
      phone,
      subject,
      message
    };

    if (req.file) {
      contactData.imageUrl = `https://checkirpala.onrender.com/uploads/${req.file.filename}`;
    }
    const newContact = new Contact(contactData);
    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      data: newContact
    });

  } catch (error) {
    console.error('Contact save error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// GET - Fetch all contacts (for support dashboard)
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET - Single contact
router.get('/contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// PUT - Update contact status
router.put('/contact/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});
export default router;
