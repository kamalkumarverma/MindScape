import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Appcontext } from '../context/Appcontext';
const Generatebtn = () => {
  const {user,setShowlogin} = useContext(Appcontext)
  const navigate = useNavigate()
  const onclickhandler = ()=>{
      if(user){
          navigate('/result')
      }else{
          setShowlogin(true)
      }
  }
  return (
    <motion.div
    initial ={{opacity: 0.2 , y:100}}
    transition={{duration:1}}
    whileInView={{opacity: 1 , y:0}}
    viewport={{once:true}}
    className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold py-6 md:py-16 text-neutral-800'>See the magic. Try now</h1>
        <button 
        onClick={onclickhandler}
        className='inline-flex items-center 
        gap-2 px-12 py-3 rounded-full bg-black
        text-white m-auto hover:scale-105
        transition-all duration-500'>Generate images
            <img className="h-6" src={assets.star_group} alt="" />
        </button>
    </motion.div>
  )
}

export default Generatebtn