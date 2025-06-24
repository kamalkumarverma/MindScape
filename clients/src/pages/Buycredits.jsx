import React, { useContext, useEffect } from 'react'
import { assets, plans } from '../assets/assets'
import { Appcontext } from '../context/Appcontext'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Buycredits = () => {
  const { user, backend_url, loadcreditdata, token, setShowlogin,VITE_RAZORPAY_KEY_ID } = useContext(Appcontext)
  const navigate = useNavigate()

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const initPay = (order) => {
    // Validate order object
    if (!order?.id || !order.amount) {
      toast.error("Invalid order details");
      return;
    }
  
    const options = {
      key: VITE_RAZORPAY_KEY_ID,
      amount: order.amount.toString(), // Razorpay expects string
      currency: order.currency || "INR",
      name: "MindScape",
      description: "Credits Purchase",
      order_id: order.id,
      image: assets.logo_icon,
      handler: async (response) => {
        try {
          const verification = await axios.post(
            `${backend_url}/api/user/verify-payment`,
            { response },
            { headers: { token } }
          );
          if (verification.data.success) {
            toast.success("Payment successful!");
            loadcreditdata();
          }
        } catch (err) {
          toast.error("Payment verification failed");
          console.error(err);
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
      },
      theme: {
        color: "#3399cc"
      },
      notes: {
        userId: user?._id
      }
    };
  
    // Error handling for Razorpay initialization
    try {
      console.log("Welcome");
      console.log(options);
      const rzp = new window.Razorpay(options);
      console.log(rzp);
      rzp.on("payment failed", (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
        console.error(response.error);
        console.log(response);
      });
      rzp.open();
    } catch (err) {
      toast.error("Failed to initialize payment");
      console.error(err);
    }
  };



  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowlogin(true)
        return
      }

      const { data } = await axios.post(
        `${backend_url}/api/user/pay-razor`,
        { planId },
        { headers: { token } }
      )

      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message || "Failed to create payment order")
      }
    } catch (error) {
      console.error("Payment Error:", error)
      toast.error(error.response?.data?.message || "Payment failed!")
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}    
      className='min-h-[80vh] text-center mb-10 pt-14'
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-3xl text-center font-medium mb-6 sm:mb-10'>Choose the plan</h1>
        
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div 
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg px-8 py-12 text-gray-600 hover:scale-105 transition-all duration-500'
          >
            <img src={assets.logo_icon} alt="" width={40} />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>₹{item.price}</span> / {item.credits} credits
            </p>

            <button 
              onClick={() => paymentRazorpay(item.id)}
              className='w-full bg-gray-800 text-white mt-8 rounded-md text-sm py-2.5 min-w-52'
            >
              {user ? "Purchase" : "Get started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Buycredits