

// @desc    Create a new brand linked image
// @route   POST /api/brand-images

import chalk from "chalk";
import { BrandLinkedImageModel } from "../models/brandLinksImage.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @access  Public
export const createBrandLinkedImage = asyncHandler(async (req, res) => {
    const { brand} = req.body;
    const imageUrl  = req.file?.path||"Something went wrong with image !!";    
    if (!brand || !imageUrl) {
        res.status(400);
        throw new Error("Brand and Image URL are required fields!");
    }

    const existingBrand = await BrandLinkedImageModel.findOne({ brand });
    if (existingBrand) {
        res.status(400);
        throw new Error("Brand already exists!");
    }

    const newBrandImage = await BrandLinkedImageModel.create({ brand, imageUrl });
    res.status(201).json(newBrandImage);
});

// @desc    Get all brand linked images
// @route   GET /api/brand-images
// @access  Public
export const getAllBrandLinkedImages = asyncHandler(async (req, res) => {
    const brandImages = await BrandLinkedImageModel.find({});
    res.status(200).json({status:"success",data:brandImages});
});

// @desc    Get a single brand linked image by ID
// @route   GET /api/brand-images/:id
// @access  Public
export const getBrandLinkedImageById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const brandImage = await BrandLinkedImageModel.findById(id);
    if (!brandImage) {
        res.status(404);
        throw new Error("Brand linked image not found!");
    }

    res.status(200).json(brandImage);
});

// @desc    Update a brand linked image
// @route   PUT /api/brand-images/:id
// @access  Public
export const updateBrandLinkedImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { brand, imageUrl } = req.body;

    const brandImage = await BrandLinkedImageModel.findById(id);
    if (!brandImage) {
        res.status(404);
        throw new Error("Brand linked image not found!");
    }

    brandImage.brand = brand || brandImage.brand;
    brandImage.imageUrl = imageUrl || brandImage.imageUrl;

    const updatedBrandImage = await brandImage.save();
    res.status(200).json(updatedBrandImage);
});

// @desc    Delete a brand linked image
// @route   DELETE /api/brand-images/:id
// @access  Public
export const deleteBrandLinkedImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const brandImage = await BrandLinkedImageModel.findOneAndDelete({_id:id});
    if (!brandImage) {
        res.status(404);
        throw new Error("Brand linked image not found!");
    }

    res.status(200).json({ message: "Brand linked image deleted successfully!" });
});
