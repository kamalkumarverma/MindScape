import { createContext, useEffect, useState } from "react"
import {toast} from 'react-toastify'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

export const Appcontext = createContext()

const VITE_Backend_URL = 'http://localhost:4000'


const AppContextProvider =(props)=>{

    const VITE_RAZORPAY_KEY_ID = 'rzp_test_VLJ4wzIaUAo9zX'

    const [user,setUser] = useState(null)

    const [showlogin,setShowlogin] = useState(false)

    const [token,setToken] = useState(localStorage.getItem('token'))

    const [credit,setCredit] = useState(false)

    const backend_url = VITE_Backend_URL

    console.log("this is backend url now this is working" + backend_url)

    const navigate = useNavigate()

    console.log("Backend URL:", backend_url)

    // get  credit data provide in app context provider
    const loadcreditdata = async()=>{
        try {
            const {data} = await axios.get(backend_url + "/api/user/credits",{headers:{token}})

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const generateImage = async(prompt)=>{
        try {

            const {data} = await axios.post(backend_url + "/api/image/generate-image",{prompt},{headers:{token}})
        

            if(data.success){
                loadcreditdata();

                return data.resultImage;
            }else{
                toast.error(data.message)
                loadcreditdata();

                if(data.creditBalance ===0){
                    navigate("/buy")
                }
            }
        
        } catch (error) {
            toast.error(error.message)
        }

    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken("")
        setUser(null)
    }

    useEffect(()=>{
       if(token){
        loadcreditdata();
       }
    },[token])

    const value = {
        user,setUser,showlogin,setShowlogin,backend_url,token,setToken,credit,setCredit,loadcreditdata,logout,generateImage,VITE_RAZORPAY_KEY_ID
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )

}

export default AppContextProvider;