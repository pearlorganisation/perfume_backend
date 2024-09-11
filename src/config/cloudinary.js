import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let resourceType = 'image'; // Default is image

    // If the file is a video, set resource_type to video
    if (file.mimetype.startsWith('video')) {
      resourceType = 'video';
    }

    return {
      folder: "Design Destination",
      resource_type: resourceType,
      public_id: file.originalname.split('.')[0],
    };
  },
});

export const upload = multer({
  storage: storage,
});
