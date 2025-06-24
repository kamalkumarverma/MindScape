import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-orange-50' px-6 sm:px-12 py-10 mt-20 ">
      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:flex-col ">

        {/* Logo + Tagline */}
        <div className="flex flex-col gap-3 ">
          <img src={assets.logo_11} alt="MindScape Logo" className=" w-36 mb-2" />
          <p className="text-sm leading-relaxed sm:text-center">
            Transform your ideas into stunning visuals with the power of AI.
          </p>
        </div>

        {/* Quick Links */}
        <div >
          <h3 className="text-black font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a     
            onClick={() => {
                      navigate('/');
                      window.scrollTo(0, 0); // Scrolls to top after navigation
          }} className="cursor-pointer hover:text-blue-500 transition">Home</a></li>
            <li><a onClick={()=>{navigate('/Buy');
              window.scrollTo(0, 0); 
            }} className="cursor-pointer hover:text-blue-500 transition">Pricing</a></li>
            <li><a onClick={()=>{navigate('/result');
              window.scrollTo(0, 0); 
            }}className="cursor-pointer hover:text-blue-500 transition">Try Now</a></li>
            <li><a onClick={()=>{navigate('/contact');
              window.scrollTo(0, 0); 
            }} className="cursor-pointer hover:text-blue-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-black font-semibold mb-3">Resources</h3>
          <ul className="text-sm space-y-2">
            <li><a onClick={()=>{navigate('/contact');
              window.scrollTo(0, 0); 
            }} className="cursor-pointer hover:text-blue-500 transition">Help Center</a></li>
            <li><a 
            onClick={() => {
                      navigate('/');
                      window.scrollTo(0, 0); // Scrolls to top after navigation
          }}
           className="cursor-pointer hover:text-blue-500 transition">Blog</a></li>
            <li><a 
            onClick={() => {
                      navigate('/Policy');
                      window.scrollTo(0, 0); // Scrolls to top after navigation
            }}
            className="cursor-pointer hover:text-blue-500 transition">Privacy Policy</a></li>
            <li><a             
            onClick={() => {
                      navigate('/Policy');
                      window.scrollTo(0, 0); // Scrolls to top after navigation
            }} className="cursor-pointer hover:text-blue-500 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-black font-semibold mb-3">Connect with Us</h3>
            <div className="flex gap-4 items-center mb-4 text-xl text-black">
              <a href="https://www.linkedin.com/in/kamlesh-kumar-dhenwal-42a349260/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:scale-110 transition" />
              </a>
              <a href="https://github.com/kamalkumarverma" target="_blank" rel="noopener noreferrer">
                <FaGithub className="hover:scale-110 transition" />
              </a>
              <a href="https://leetcode.com/u/kamal_kumar/" target="_blank" rel="noopener noreferrer">
                <SiLeetcode className="hover:scale-110 transition" />
              </a>
            </div>
          <p className="text-sm">Email: Kamleshverma102@gmail.com</p>
        </div>

      </div>

      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} kamalkumar.com — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
