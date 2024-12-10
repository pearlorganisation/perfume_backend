import { ProductReviewCount } from "../models/productReviewCount.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ReviewCountModel from "../models/reviews.js";
// import { ProductReviewCount } from "../models/productReviewCount.js";
import chalk from "chalk";
import reviews from "../models/reviews.js";
import mongoose from "mongoose";
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



export const updateProductReviewCount = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const { reaction, season, longevity, sillage, gender, priceValue, userId } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const review = await ReviewCountModel.findOne({ perfume: productId, reviewBy: userId }).session(session);
        const productCount = await ProductReviewCount.findOne({ productId }).session(session);

        if (!review || !productCount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json("Review Not Found !!");
        }

        // Update reaction
        if (reaction) {
            const currReaction = review.reaction;
            productCount.reaction[`${reaction}`] += 1;
            productCount.reaction[`${currReaction}`] -= 1;
            review.reaction = reaction;
        }

        // Update season
        if (season) {
            const currSeason = review.season;
            productCount.season[`${currSeason}`] -= 1;
            productCount.season[`${season}`] += 1;
            review.season = season;
        }

        // Update longevity
        if (longevity) {
            const currLongevity = review.longevity;
            productCount.longevity[`${currLongevity}`] -= 1;
            productCount.longevity[`${longevity}`] += 1;
            review.longevity = longevity;
        }

        // Update sillage
        if (sillage) {
            const currSillage = review.sillage;
            productCount.sillage[`${currSillage}`] -= 1;
            productCount.sillage[`${sillage}`] += 1;
            review.sillage = sillage;
        }

        // Update gender
        if (gender) {
            const currGender = review.gender;
            productCount.gender[`${currGender}`] -= 1;
            productCount.gender[`${gender}`] += 1;
            review.gender = gender;
        }

        // Update price value
        if (priceValue) {
            const currPriceValue = review.priceValue;
            productCount.priceValue[`${currPriceValue}`] -= 1;
            productCount.priceValue[`${priceValue}`] += 1;
            review.priceValue = priceValue;
        }

        // Save updates
        await productCount.save({ runValidators: false, session });
        await review.save({ runValidators: false, session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            status: true,
            message: "Vote Review Updated !!",
            productCount,
            review,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error); // Pass the error to error-handling middleware
    }
});

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
