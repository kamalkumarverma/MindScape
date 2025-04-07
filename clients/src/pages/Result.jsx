import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion";
import { Appcontext } from '../context/Appcontext';
const Result = () => {

  const {generateImage} = useContext(Appcontext)
  const [image,setImage] = useState(assets.desk)
  const [isimageloaded,setIsimageloaded] = useState(false)
  const [loading,setLoding] = useState(false)
  const [input,setInput] = useState('')

  const onSubmithandler = async(e) =>{
      e.preventDefault();
      setLoding(true);

      if(input){
        const image = await generateImage(input);
        if(image){
          setIsimageloaded(true)
          setImage(image)
        }
      }

      setLoding(false);
  }

  return (
    <motion.form 
    initial ={{opacity: 0.2 , y:100}}
    transition={{duration:1}}
    whileInView={{opacity: 1 , y:0}}
    viewport={{once:true}}        
    action=""
      onSubmit={onSubmithandler}
      className='flex flex-col min-h-[90vh] justify-center items-center'
    >
        <div>
            <div className='relative'>
                <img src={image} alt=""  className='max-w-sm rounded'/>
                <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 
              ${loading ? 'w-full transition-all duration-[3s]' : 'w-0'}`}></span>
            </div>
            <p className={!loading ? "hidden" :""}>Loading........</p>
        </div>
        {!isimageloaded &&
          <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
            <input onChange={e=>setInput(e.target.value)}
            value={input}
            type="text" name="" id=""  placeholder='describe what you want to generate'
            className='flex-1 bg-transparent ml-8 outline-none max-sm:w-20 placeholder-color'
            />
            <button type='submit'
            className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
          </div>
        }

        {isimageloaded &&
        <div className='flex flex-wrap justify-center items-center gap-2 text-white  text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={()=>(setIsimageloaded(false))}
          className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate another</p>
          <a className=' bg-zinc-900 rounded-full cursor-pointer px-10 py-3'
           href={image} download>Download</a>
        </div>
        }
    </motion.form>
  )
}

export default Result