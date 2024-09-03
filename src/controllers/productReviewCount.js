import { ProductReviewCount } from "../models/productReviewCount.js";

// Create a new ProductReviewCount entry
export const createProductReviewCount = async (req, res) => {
    try {
        const productReviewCount = new ProductReviewCount(req.body);
        await productReviewCount.save();
        res.status(201).json(productReviewCount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all ProductReviewCount entries
export const getProductReviewCounts = async (req, res) => {
    try {
        const productReviewCounts = await ProductReviewCount.find();
        res.status(200).json(productReviewCounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single ProductReviewCount entry by ID
export const getProductReviewCountById = async (req, res) => {
    try {
        const productReviewCount = await ProductReviewCount.findById(req.params.id);
        if (!productReviewCount) {
            return res.status(404).json({ message: 'ProductReviewCount entry not found' });
        }
        res.status(200).json(productReviewCount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getProductReviewCountByPerfumeID = async (req, res) => {
    try {
        const productReviewCount = await ProductReviewCount.findOne({productId:req.params.id});
        if (!productReviewCount) {
            return res.status(404).json({ message: 'ProductReviewCount entry not found' });
        }
        res.status(200).json({status:true,message:"Review Counts SuccessFully Fetched !! ",data:productReviewCount});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a ProductReviewCount entry by ID
export const updateProductReviewCount = async (req, res) => {
    try {
        const productReviewCount = await ProductReviewCount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productReviewCount) {
            return res.status(404).json({ message: 'ProductReviewCount entry not found' });
        }
        res.status(200).json(productReviewCount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a ProductReviewCount entry by ID
export const deleteProductReviewCount = async (req, res) => {
    try {
        const productReviewCount = await ProductReviewCount.findByIdAndDelete(req.params.id);
        if (!productReviewCount) {
            return res.status(404).json({ message: 'ProductReviewCount entry not found' });
        }
        res.status(204).send(); // No content to send back for successful deletion
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
