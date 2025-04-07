// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'

// import connectdb from './config/mongoDB.js'
// import userRouter from './routes/userRoutes.js'
// import imageRouter from './routes/imageRoutes.js'

// const PORT = process.env.PORT || 4000

// const app = express()


// app.use(express.json())
// app.use(cors())

// await connectdb()


// app.use("/api/user",userRouter)
// app.use("/api/image",imageRouter)

// app.get('/',(req,res)=>res.send("Api working"))

// app.listen(PORT,()=> console.log("server listening on port" + PORT))


import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectdb from './config/mongoDB.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

// Enhanced CORS configuration
const corsOptions = {
    origin: [
      '*',
      'http://localhost:5173',
      'https://localhost:5173',
      process.env.FRONTEND_URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization',
      'token',
      'x-requested-with'
    ],
    credentials: true,
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions))

// Handle preflight requests explicitly
app.options('*', cors(corsOptions))

app.use(express.json())
await connectdb()

app.use("/api/user", userRouter)
app.use("/api/image", imageRouter)

app.get('/', (req, res) => res.send("Api working"))

app.listen(PORT, () => console.log("Server listening on port " + PORT))