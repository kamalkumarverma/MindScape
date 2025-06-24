import axios from "axios";
import userModel from "../models/usermodel.js";
import FormData from "form-data";

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        // Validate user and prompt
        if (!userId || !prompt || prompt.trim().length === 0) {
            return res.send({ success: false, message: "Missing or invalid details" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.send({ success: false, message: "User not found" });
        }

        if (user.creditBalance <= 0) {
            return res.send({
                success: false,
                message: "No credit balance",
                creditBalance: user.creditBalance
            });
        }

        // Prepare the form data
        const formData = new FormData();
        formData.append("prompt", prompt);

        // Make the API call to ClipDrop
        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    ...formData.getHeaders(), // Include proper multipart headers
                    'x-api-key': process.env.CLIP_DROP_API,
                },
                responseType: "arraybuffer" // To receive binary data
            }
        );

        // Handle empty or invalid response
        if (!data || data.length === 0) {
            return res.send({ success: false, message: "Image generation failed, empty response" });
        }

        // Convert binary to base64 string
        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Update credit balance
        await userModel.findByIdAndUpdate(user._id, {
            creditBalance: user.creditBalance - 1
        });

        // Send success response with image
        res.send({
            success: true,
            message: "Image generated",
            creditBalance: user.creditBalance - 1,
            resultImage
        });

    } catch (error) {
        console.error("Error in generateImage:", error);
        return res.send({ success: false, message: error.message });
    }
};

export default generateImage;
