import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'
import Result from './pages/Result'
import Buycredits from './pages/Buycredits'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Contact from './pages/Contact';
import PolicyPage from './pages/PolicyPage.jsx';
import { Appcontext } from './context/Appcontext'

const App = () => {

  const {showlogin} = useContext(Appcontext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>

      <ToastContainer position='bottom-right'/>

      <Navbar/>
      {showlogin && <Login/>}
      <Routes>

        <Route path='/' element ={<Home/>}/>
        <Route path='/result' element ={<Result/>}/>
        <Route path='/buy' element ={<Buycredits/>}/>
        <Route path='/contact' element ={<Contact/>} />
        <Route path="/policy" element={<PolicyPage />} />

      </Routes>

      <div className='w-full'>
        <Footer  />
      </div>

    </div>
    
  )

}

export default App