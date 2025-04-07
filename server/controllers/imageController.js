import axios from "axios";
import userModel from "../models/usermodel.js";
import FormData from "form-data"

const generateImage =async (req,res)=>{
    try {



        const {userId,prompt} = req.body;

        const user = await userModel.findOne({ _id: userId });

        if(!user || !prompt){

            return res.send({success:false,message:"missing details"})             
        }

        if(user.creditBalance===0 || user.creditBalance < 0){
            return res.send({success:false,message:"no credit balance",creditBalance:user.creditBalance})
        }

        const formData = new FormData();
        formData.append("prompt",prompt);

        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
            headers: {
                'x-api-key': process.env.CLIP_DROP_API,
              },
              responseType:"arraybuffer"
        })

        const base64Image = Buffer.from(data,"binary").toString("base64");

        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

        res.send({success:true,message:"image generated",creditBalance:user.creditBalance-1,resultImage})


    } catch (error) {
        console.log(error)

        return res.send({success:false,message:error.message})    
    }
}

export default generateImage