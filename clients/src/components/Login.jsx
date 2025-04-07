import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Appcontext } from '../context/Appcontext'
import {motion} from "framer-motion"

import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {

    const [state,setState] = useState('Login')

    const {showlogin,setShowlogin,backend_url,setToken,setUser} = useContext(Appcontext)

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    // console.log("Backend URL:", backend_url);
    // console.log("Context Values:", { backend_url });
    const onSubmitHandler = async (e) =>{
        e.preventDefault();

        try {
            if(state === "Login"){
                console.log("Backend URL:", backend_url);
               const {data} =  await axios.post("http://localhost:4000" + "/api/user/login",{email,password})

               if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token',data.token)
                setShowlogin(false)
               }else{
                toast.error(data.message)
               }
            }else{
                const {data} =  await axios.post("http://localhost:4000" + "/api/user/register",{name,email,password})
                // console.log("Backend URL:", backend_url);
                if(data.success){
                 setToken(data.token)
                 setUser(data.user)
                 localStorage.setItem('token',data.token)
                 setShowlogin(false)
                }else{
                 toast.error(data.message)
                }
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
            document.body.style.overflow = 'hidden';
            return ()=>{
                document.body.style.overflow = 'unset';
            }
    },[])


  return (
    <div

     className='fixed top-0 left-0 right-0 bottom-0 z-10
    backdrop-blur-sm bg-black/30 flex justify-center items-center '> 

        <motion.form 

        onSubmit={onSubmitHandler}

        initial ={{opacity: 0.2 , y:50}}
        transition={{duration:0.3}}
        whileInView={{opacity: 1 , y:0}}
        viewport={{once:true}}  
        action="" className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-2xl text-center text-neutral-500 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! please sign in to continue</p>

            {   state !== 'Login'  &&   <div className='border px-6 py-2 flex justify-center gap-2 rounded-full mt-5'>
                {/* <img src={assets.lock_icon} alt="" /> */}
                <input type="text" name="" id="" 
                onChange={e=>setName(e.target.value)}
                value={name}
                required
                className='outline-none text-sm '
                placeholder='Full name' />
            </div>}

            <div className='border px-6 py-2 flex justify-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input type="email" name="" id="" 
                onChange={e=>setEmail(e.target.value)}
                value={email}
                required
                className='outline-none text-sm '
                placeholder='Email id' />
            </div>
            <div className='border px-6 py-2 flex justify-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input type="password" name="" id="" 
                required
                onChange={e=>setPassword(e.target.value)}
                value={password}
                className='outline-none text-sm '
                placeholder='Password' />
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

            <button className='bg-blue-600 w-full rounded-full text-white py-2'>{state==='Login' ? "Login" : "Create account"}</button>

{  state==='Login' ?         
                <p className='text-center mt-5'>Don't have an account? 
                    <span className='text-blue-600 cursor-pointer' 
                    onClick={()=>setState('Sign up')}
                    >Sign up</span></p>
            :
                <p className='text-center mt-5'>Already have an account? 
                <span className='text-blue-600 cursor-pointer'
                onClick={()=>setState('Login')}
                >Login</span></p>}

            <img onClick={()=>setShowlogin(false)}
            src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
        </motion.form>

    </div>
  )
}

export default Login