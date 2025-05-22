# MindScape – Text-to-Image Generator

**MindScape** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to enter a text prompt and generate stunning images using AI (such as DALL·E or Stable Diffusion). It also supports user feedback, contact form submissions, and image uploads.

---
![image](https://github.com/user-attachments/assets/6817eb5d-22f3-4075-9a91-5c2bc0a5038e)

![image](https://github.com/user-attachments/assets/27b6af39-1f75-4065-8306-1f0ecab030c2)

![image](https://github.com/user-attachments/assets/d913146e-7509-4bde-95d0-bcf4684760cc)
![image](https://github.com/user-attachments/assets/3ce99bb4-d78a-42ff-809e-b580b94d1e49)

![image](https://github.com/user-attachments/assets/a7e3fec0-7d02-4952-94e0-05c0236ad5bd)
![image](https://github.com/user-attachments/assets/6d089a80-0bcb-4a37-890a-876c967f2185)

Payment gateway
![image](https://github.com/user-attachments/assets/4e5d978a-9ce1-4130-8597-422043f68781)
![image](https://github.com/user-attachments/assets/8f5c8210-af68-4d29-848d-a8cdcd716a1d)

Check eligibility for pay later
![image](https://github.com/user-attachments/assets/8e28381e-f235-462b-b204-0b315c13aa78)



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
