// models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String },
  suggestion: { type: String },
  issue: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);
