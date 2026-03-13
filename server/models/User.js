import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  village: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String }, // store filename or URL
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;