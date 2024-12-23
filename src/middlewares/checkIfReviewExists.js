import chalk from "chalk";
import { updateProductReviewCount } from "../controllers/productReviewCount.js";
import reviews from "../models/reviews.js";

export const checkIfReviewExists = async (req, res, next) => {
    try {
        const isReviewAlreadyExists = await reviews.findOne({ reviewBy: req?.body?.reviewBy, perfume:req?.body.perfume }).lean();

        if (isReviewAlreadyExists) {
            console.log(chalk.bgWhiteBright("IM COMMING ON TO THE MIDDLE WARE WHO CHECKS isReviewAlreadyExists"))

            // Redirect to `updateProductReviewCount`
            req.isUpdate = true; // Add a flag to the request
        } else {
            req.isUpdate = false; // Add a flag to indicate it's a new creation
        }
        
        return updateProductReviewCount(req, res, next);
        // Pass control to the next handler
    } catch (error) {
        next(error); // Handle errors gracefully
    }
};