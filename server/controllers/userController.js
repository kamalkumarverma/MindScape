import userModel from "../models/usermodel.js";
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

import razorpay from "razorpay"

import transactionModel from "../models/transactionModel.js";

const registerUser = async (req,res)=>{

    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.send({success: false, message:"missing details"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,email,password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user  = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.JWT_Secret)

        return res.send({success: true, token,user:{name:user.name}})
        
    } catch (error) {
        console.log(error)

        return res.send({success:false,message:error.message})
        
    }

}


// const Loginuser = async(req,res)=>{
//     try {
//         const {email,password} = req.body;
//         const user = await userModel.findOne({email})

//         if(!user){
//             return res.send({success:false,message:"user does not exist"})
//         }

//         const isMatch = await bcrypt.compare(password,user.password)
        
//         if(isMatch){

//             const token = jwt.sign({id:user._id},process.env.JWT_Secret)

//             return res.send({success: true, token,user:{name:user.name}})            
//         }else{
//             return res.send(({success:false,message:"Invalid credentials"}))
//         }
//     } catch (error) {
//         console.log(error)

//         return res.send({success:false,message:error.message})        
//     }
// }

const Loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_Secret, { expiresIn: "7d" });

            return res.send({ success: true, token, user: { name: user.name } });
        } else {
            return res.status(401).send({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error.message });
    }
};


const userCredits =async (req,res)=>{
    try {
        const userId = req.body.userId; // Extract only userId
        const user = await userModel.findOne({ _id: userId }); // Find using _id
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found",userid:userId});
        }

        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})

        
    } catch (error) {
        console.log(error)

        return res.send({success:false,message:error.message})            
    }
}



const razorpayInstance = new razorpay({
    
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,

})

// const paymentRazorpay = async(req,res) =>{

//     console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
//     console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
    
//     try {
//         const payments = await razorpayInstance.payments.all();
//         console.log("Razorpay connection successful");
//     } catch (err) {
//         console.error("Razorpay connection failed:", err);
//     }
//         try {

//             const {userId,planId} = req.body;
//             const userData = await userModel.findById(userId);

//             if(!userId || !planId){
//                 return res.send({success:false,message:"missing details"})
//             }
            

//             let plan, credits,amount,date

//             switch (planId) {
//                 case 'Basic':
//                     plan = "Basic"
//                     credits = 100
//                     amount= 1
//                     break;

//                 case 'Advanced':
//                     plan = "Advanced"
//                     credits = 500
//                     amount= 1.5
//                     break;
        
//                 case 'Business':
//                     plan = "Business"
//                     credits = 5000
//                     amount= 2
//                     break;
//                 default:
//                     return res.send({success:false,message:"Plan not found"})
//                     break;
//             }

//             date = Date.now()

//             const transactionData = {
//                 userId,plan, credits,amount,date
//             }


//             const newtransaction = await transactionModel.create(transactionData)

//             const options = {
//                 amount:amount*100,
//                 currency:process.env.CURRENCY,
//                 receipt:newtransaction._id
//             }

//             await razorpayInstance.orders.create(options,(error,order)=>{
//                 if(error){
//                     console.log(error);
//                     return res.send({success:false,message:error.message})
//                 }

//                 return res.send({success:true,order,})
//             })
//         } catch (error) {
//             console.log(error)
//             return res.send({success:false,message:error.message})
//         }
// }

const paymentRazorpay = async (req, res) => {
    try {
        // Test Razorpay connection first
        try {
            await razorpayInstance.payments.all({ count: 1 });
            console.log("Razorpay connection successful");
        } catch (err) {
            console.error("Razorpay connection failed:", err);
            return res.status(500).json({ 
                success: false, 
                message: "Payment service unavailable" 
            });
        }

        const { userId, planId } = req.body;
        
        // Validate inputs
        if (!userId || !planId) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing userId or planId" 
            });
        }
        console.log("one");

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        console.log("two");

        // Define plans more cleanly
        const PLANS = {
            Basic: { credits: 100, amount: 1 },
            Advanced: { credits: 500, amount: 1.5 },
            Business: { credits: 5000, amount: 2 }
        };
        console.log("three");

        const plan = PLANS[planId];
        if (!plan) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid planId" 
            });
        }
        console.log("four");

        // Create transaction record
        const transactionData = {
            userId,
            plan: planId,
            credits: plan.credits,
            amount: plan.amount,
            date: new Date()
        };
        console.log("five");

        const newTransaction = await transactionModel.create(transactionData);
        console.log("six");
        // Razorpay order options
        const options = {
            amount: plan.amount * 100, // Razorpay expects amount in paise
            currency: process.env.CURRENCY || "INR",
            receipt: newTransaction._id.toString(),
            notes: {
                userId: userId.toString(),
                plan: planId
            }
        };
        console.log("seven");

        // Create Razorpay order using async/await
        console.log(options);
        const order = await razorpayInstance.orders.create(options);
        console.log(order);
        console.log("eight");
        
        return res.status(200).json({ 
            success: true, 
            order 
        });

    } catch (error) {
        console.error("Payment Error:", error);
        
        // Handle Razorpay API errors specifically
        if (error.error && error.error.description) {
            return res.status(400).json({
                success: false,
                message: error.error.description
            });
        }

        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

export {registerUser,Loginuser,userCredits,paymentRazorpay}