import express from 'express';

import {Loginuser,registerUser,userCredits,paymentRazorpay} from "../controllers/userController.js"
import userAuth from '../midlewares/auth.js';

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', Loginuser)
userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/pay-razor',userAuth,paymentRazorpay)




export default userRouter;
