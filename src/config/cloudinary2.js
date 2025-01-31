import chalk from "chalk";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFilesByAssetIds = async (assetIds) => {
  try {
    console.log(chalk.bgBlueBright("We are coming on deletion"))
    // Step 1: Get Public IDs from Asset IDs
    const response = await cloudinary.api.resources_by_asset_ids(assetIds);
    console.log(chalk.bgBlueBright("We are coming on deletion",response))

    if (!response.resources || response.resources.length === 0) {
      console.log("No matching assets found.");
      return { status: false, message: "No matching assets found." };
    }

    // Step 2: Extract Public IDs
    const publicIds = response.resources.map((file) => file.public_id);
    console.log("Public IDs found:", publicIds);

    // Step 3: Delete Each File from Cloudinary
    const deleteResults = await Promise.all(
      publicIds.map(async (publicId) => {
        return cloudinary.uploader.destroy(publicId);
      })
    );

    console.log("Deletion Results:", deleteResults);
    return { status: true, message: "Files deleted successfully", deleteResults };
  } catch (error) {
    console.error("Error deleting files:", error);
    return { status: false, message: error?.message };
  }
};


export const uploadFile = async (files) => {
  try {
    let resultArr = await Promise.all(
      files.map(async (file) => {
        try {
          const res = await cloudinary.uploader.upload(file.path, {
            folder: "perfumetrics",
            resource_type: "auto",
          });
          // Deleting the file after successful upload
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting file from disk:", err);
            } else {
              console.log("File deleted from disk:", file.path);
            }
          });

          return res;
        } catch (uploadError) {
          console.error("Error uploading file:", uploadError);
          return null; // or handle error as per your requirement
        }
      })
    );

    const result = resultArr.map((file) => ({
      fieldname: file.asset_id,
      originalname: file.original_filename,
      mimetype: file.resource_type,
      path: file.secure_url,
      size: file.bytes,
      filename: file.original_filename,
    }));

    return { status: true, result: result.filter(Boolean) };
  } catch (error) {
    return { status: false, message: error?.message };
  }
};
