# MindScape – Text-to-Image Generator

**MindScape** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to enter a text prompt and generate stunning images using AI (such as DALL·E or Stable Diffusion). It also supports user feedback, contact form submissions, and image uploads.

---
## 🚀 Live Demo

Check out the live version of the MindScape here:  
🔗 [MindScape Live Demo](https://mindscape-1.onrender.com/)

## 🚀 Tech Stack

### Frontend (React)
- React.js (Vite)
- Tailwind CSS
- React Router
- Framer Motion (for animation)

### Backend (Node.js + Express)
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (for file uploads)

---

## 📁 Folder Structure

### `clients/`
React frontend setup.

#### `src/`
- **assets/** → Logo, icons (facebook, instagram, etc.)
- **components/** → Reusable components like Navbar, Footer, Cards
- **context/** → React Context API logic (if used)
- **pages/** → App pages like Home.jsx, Contact.jsx, Review.jsx

#### Key files:
- **App.jsx** → Defines routes
- **main.jsx** → Entry point
- **index.css** → Tailwind CSS setup

---

### `server/`
Node + Express backend setup.

#### `config/`
- DB connection (e.g., `db.js`)

#### `controllers/`
- Logic for handling requests
  - `contactController.js`
  - `reviewController.js`
  - `generateImageController.js`

#### `middlewares/`
- Input validation logic:
  - Name: No special characters
  - Email: Valid format (`abc@gmail.com`, `2024uch1455@mnit.ac.in`)
  - Phone: Exactly 10 digits

#### `models/`
- MongoDB schemas:
  - `Contact.js`
  - `Review.js`

#### `routes/`
- `contactRoutes.js`
- `reviewRoutes.js`
- `generateImageRoutes.js`

---

## 📬 Key Features

### 🖼️ 1. Text-to-Image Generation
- Enter a prompt → AI returns image
- AI model could be OpenAI’s DALL·E or Stability AI’s Stable Diffusion

### ✉️ 2. Contact Page
- Fields: name, email, contact number, suggestion, issue
- Validations:
  - Email regex format
  - Phone: 10-digit only
  - Name: No special characters

### 🗣️ 3. Review Page
- Users can upload their name, image, and write a review
- Images stored using Multer or cloud storage

### 📱 4. Responsive UI
- Fully responsive using Tailwind CSS and Framer Motion
- Buttons centered on small screens, laid out in grid/flex on larger ones

---

## 🔒 Validation Logic Example

```js
// Name validation
const nameRegex = /^[a-zA-Z\s]+$/;
if (!nameRegex.test(req.body.name)) return res.status(400).send("Invalid name");

// Email validation
const emailRegex = /^[\w.-]+@([\w-]+\.)+(com|ac\.in)$/;
if (!emailRegex.test(req.body.email)) return res.status(400).send("Invalid email");

// Phone validation
if (!/^\d{10}$/.test(req.body.contact)) return res.status(400).send("Invalid contact number");
# MindScape
