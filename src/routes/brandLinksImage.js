import express from "express";
import { createBrandLinkedImage, deleteBrandLinkedImage, getAllBrandLinkedImages, getBrandLinkedImageById, updateBrandLinkedImage } from "../controllers/brandLinksController.js";
import { upload } from "../config/cloudinary.js";


const router = express.Router();

router.route("/")
    .post(upload.single('imageUrl'), createBrandLinkedImage)    // Create a new brand linked image
    .get(getAllBrandLinkedImages);  // Get all brand linked images

router.route("/:id")
    .get(getBrandLinkedImageById)   // Get a brand linked image by ID
    .put(updateBrandLinkedImage)    // Update a brand linked image
    .delete(deleteBrandLinkedImage); // Delete a brand linked image

export const ImageUrlRouter =  router;
