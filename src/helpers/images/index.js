import dotenv from "dotenv";
var cloudinary = require("cloudinary").v2;
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadImage = async (image, path) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
            quality: "auto",
            resource_type: "image",
            folder: path,
        });
        return uploadResponse;
    } catch (error) {
        return res.status(500).json({ error: "Failed to save image" })
    }

}

export const deleteImage = async (url) => {
    try {
        const deleteResponse = await cloudinary.uploader.destroy(url);
        return deleteResponse;
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete image" })
    }

}


