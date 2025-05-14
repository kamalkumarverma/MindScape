
// src/pages/Contact.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    suggestion: '',
    issue: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000"+ "/api/contact", formData);
      alert("Thank you for your feedback!");
      setFormData({
        name: '',
        email: '',
        contact: '',
        suggestion: '',
        issue: '',
      });
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 shadow-md rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded" required />
        <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded" required />
        <input name="contact" type="tel" placeholder="Contact Number" value={formData.contact} onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded" />
        <textarea name="suggestion" placeholder="Your Suggestion" value={formData.suggestion} onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded" rows="3" />
        <textarea name="issue" placeholder="Describe the issue" value={formData.issue} onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded" rows="4" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
