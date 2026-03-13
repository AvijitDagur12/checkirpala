import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['certificate', 'scheme', 'complaint', 'water', 'road', 'other']
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,  // will store image path/url
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;