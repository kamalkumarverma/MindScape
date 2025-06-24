import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectdb from './config/mongoDB.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import contactRoutes from './routes/contact.js';

const PORT = process.env.PORT || 4000;
const app = express();

// ✅ Correct CORS setup for frontend at https://mindscape-1.onrender.com
const corsOptions = {
  origin: 'https://mindscape-1.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
await connectdb();

// API routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.use('/api/contact', contactRoutes);

// Root route
app.get('/', (req, res) => res.send('API working'));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
