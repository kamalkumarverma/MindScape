import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { Appcontext } from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowlogin } = useContext(Appcontext);
  const navigate = useNavigate();

  const onclickhandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowlogin(true);
    }
  };

  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-20 px-4'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className='inline-flex text-stone-500 gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
      >
        <p>🚀 Next-Gen Text to Image Generator</p>
        <img src={assets.star_icon} alt="Star icon" />
      </motion.div>

        <motion.h1
        className='text-4xl sm:text-5xl max-w-[650px] mx-auto mt-10 font-extrabold leading-tight text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        >
        From <span className='text-blue-600'>Thoughts</span> to Pixels   
        <p>In Seconds</p>
        </motion.h1>


      <motion.p
        className='text-neutral-700 max-w-2xl mt-5 mx-auto text-lg sm:text-xl leading-relaxed'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        No brushes, no limits. Convert your thoughts into stunning images powered by cutting-edge AI. Just type, click, and create.
      </motion.p>

      <motion.button
        onClick={onclickhandler}
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px #fff' }}
        whileTap={{ scale: 0.95 }}
        className='mt-8 px-12 py-3 text-lg rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Try Now ✨
        <img className='h-6' src={assets.star_group} alt="Star group" />
      </motion.button>

      <motion.div
        className='flex flex-wrap justify-center mt-16 gap-4'
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {Array(6).fill("").map((_, index) => (
          <motion.img
            whileHover={{ scale: 1.08 }}
            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
            src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
            alt={`Sample ${index}`}
            key={index}
            width={70}
          />
        ))}
      </motion.div>

      <motion.p
        className='mt-4 text-sm text-gray-500'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        ✨ Curated by <strong>MindScape</strong> - Where thoughts become pixels.
      </motion.p>
    </motion.div>
  );
};

export default Header;
