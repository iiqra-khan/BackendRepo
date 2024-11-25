// server has file and then it will give us a local path and we will remove it from server
import {v2 as cloudinary} from "cloudinary"
import fs from "fs" //for file
// unlink removes link from the file

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null //or retrn error
        const response = await cloudinary.uploader.upload(localFilePath, {
            //option to upload
            resource_type: "auto"
        })
        // file has been uploaded succenssfully
        console.log("file successfullly uploaded");
        console.log(response.url);
        return response
    }catch(error){
        fs.unlinkSync(localFilePath) //remove locally saved temp file as upload op got failed sync as it should happen then we will move forward
        return null;
    }
}

export {uploadOnCloudinary}