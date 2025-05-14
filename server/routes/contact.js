import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Helper validation functions
const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name); // Only alphabets and spaces
const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const isValidContact = (contact) => /^\d{10}$/.test(contact); // Exactly 10 digits

router.post('/', async (req, res) => {
  const { name, email, contact, suggestion, issue } = req.body;

  // Validations
  if (!name || !isValidName(name)) {
    return res.status(400).json({ error: 'Name must contain only letters and spaces.' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (!contact || !isValidContact(contact)) {
    return res.status(400).json({ error: 'Contact number must be exactly 10 digits.' });
  }

  if (!issue || issue.trim() === '') {
    return res.status(400).json({ error: 'Issue is required.' });
  }

  try {
    const contactData = new Contact({ name, email, contact, suggestion, issue });
    await contactData.save();
    res.status(201).json({ message: 'Contact info submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while saving contact info.' });
  }
});

export default router;
