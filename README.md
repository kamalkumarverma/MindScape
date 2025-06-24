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

![Screenshot 2025-06-24 135238](https://github.com/user-attachments/assets/4cf4b07d-f4d4-425d-a82d-9a22f6c68dc7)
![Screenshot 2025-06-24 135317](https://github.com/user-attachments/assets/29d57e40-c859-4454-b793-e117b95de1b4)

![Screenshot 2025-06-24 135340](https://github.com/user-attachments/assets/dafa6a8e-5934-4357-9397-d29bbc92d927)

![Screenshot 2025-06-24 135356](https://github.com/user-attachments/assets/9f69e9a4-a53e-43a5-9068-748daad90259)

![Screenshot 2025-06-24 135419](https://github.com/user-attachments/assets/94087545-1733-427f-9dd4-419bcb1d0858)
![Screenshot 2025-06-24 135439](https://github.com/user-attachments/assets/8792fee7-40c1-4a06-b440-336a6bdca550)
![Screenshot 2025-06-24 135456](https://github.com/user-attachments/assets/7e646899-2d3a-4e55-9cd8-0be9ebc14c22)
![Screenshot 2025-06-24 135513](https://github.com/user-attachments/assets/7dfc56a5-5f48-4e91-9f63-84b0a2b11d4c)
![Screenshot 2025-06-24 141107](https://github.com/user-attachments/assets/81a903c1-eaf9-4e9b-bc3f-8a5fa772578b)
![Screenshot 2025-06-24 141124](https://github.com/user-attachments/assets/a33d31eb-c966-4b81-8c91-8c6511e2ce0b)

![Screenshot 2025-06-24 141203](https://github.com/user-attachments/assets/d1afd042-5a9d-40ce-a3bc-877668294526)
![Screenshot 2025-06-24 141225](https://github.com/user-attachments/assets/4362e683-d768-4adb-8908-f9c3fa3442c7)

![Screenshot 2025-06-24 141312](https://github.com/user-attachments/assets/812c3b7a-6a84-4aeb-90f0-cb82bda3c514)
![Screenshot 2025-06-24 141345](https://github.com/user-attachments/assets/ea226423-e02c-4fd8-a6fa-60d6232971a6)
![Screenshot 2025-06-24 141441](https://github.com/user-attachments/assets/054227a2-eaa8-4318-a1b0-9abb92158f1e)




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
