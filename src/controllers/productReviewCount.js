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

    res.status(201).json({ status: true, data: productReviewCount });
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
      return res
        .status(404)
        .json({ message: "ProductReviewCount entry not found" });
    }
    res.status(200).json(productReviewCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductReviewCountByPerfumeID = async (req, res) => {
  try {
    const productReviewCount = await ProductReviewCount.findOne({
      productId: req.params.id,
    });
    if (!productReviewCount) {
      return res
        .status(404)
        .json({ message: "ProductReviewCount entry not found" });
    }
    res
      .status(200)
      .json({
        status: true,
        message: "Review Counts SuccessFully Fetched !! ",
        data: productReviewCount,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductReviewCount = asyncHandler(async (req, res, next) => {
    console.log(chalk.yellow("we are here in update !!",JSON.stringify(req.body)))

  let { productId } = req.params;
  let { reaction, season, longevity, sillage, gender, priceValue, userId } =
    req.body;
  
   productId = productId || req?.body?.perfume; 
   userId = userId ||  req?.body?.reviewBy ;
    const session = await mongoose.startSession();
    session.startTransaction();
  try {

    const productCount = await ProductReviewCount.findOne({
      productId,
    }).session(session);

    if (!productCount) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ status: true, message: "Review Not Found !!" });
    }

    let review = await ReviewCountModel.findOne({
        perfume: productId,
        reviewBy: userId,
      });

      console.log(chalk.bgCyanBright("review 235345345",productId,userId))
      
    if (!review) {
      review = new  ReviewCountModel(
        { perfume: productId, reviewBy: userId },
      );
      
      console.log(chalk.bgCyanBright("im cumming in creation block !!"))

    } else {
      review = await ReviewCountModel.findOne({
        perfume: productId,
        reviewBy: userId,
      }).session(session);
      console.log(chalk.bgBlue("Im comming for updatation of review why !!"));

    }
    
    // Update reaction
    if (reaction) {
      const currReaction = review?.reaction;
      productCount.reaction[`${reaction}`] += 1;
      console.log(chalk.green("hi there im reaction",reaction)) 
      console.log(chalk.green("hi there im currReaction",currReaction)) 

      if (!currReaction) productCount.reaction[`${currReaction}`] -= 1;
      review.reaction = reaction;

    }

    // Update season
    if (season) {

      const currSeason = review?.season;
      console.log(chalk.bgYellowBright("This is season",season))
      console.log(chalk.bgYellowBright("This is currSeason",currSeason))

      if (currSeason) productCount.season[`${currSeason}`] -= 1;
      productCount.season[`${season}`] += 1;
      review.season = season;
    }

    // Update longevity
    if (longevity) {

        console.log(chalk.bgYellowBright("This is season",longevity))

      const currLongevity = review?.longevity;
      console.log(chalk.bgYellowBright("This is season",currLongevity))


      if (currLongevity) productCount.longevity[`${currLongevity}`] -= 1;

      productCount.longevity[`${longevity}`] += 1;
      review.longevity = longevity;
    }

    // Update sillage
    if (sillage) {
      const currSillage = review?.sillage;

      if (currSillage) productCount.sillage[`${currSillage}`] -= 1;
      console.log(chalk.bgYellowBright("This is sillage",sillage))
      console.log(chalk.bgYellowBright("This is currSillage",currSillage))

      productCount.sillage[`${sillage}`] += 1;
      review.sillage = sillage;
    }

    // Update gender
    if (gender) {
      const currGender = review?.gender;

      if (gender) productCount.gender[`${currGender}`] -= 1;
      console.log(chalk.bgYellowBright("This is sillage",gender))
      console.log(chalk.bgYellowBright("This is currSillage",currGender))
      productCount.gender[`${gender}`] += 1;
      review.gender = gender;
    }

    // Update price value
    if (priceValue) {
      const currPriceValue = review?.priceValue;

      if (currPriceValue) productCount.priceValue[`${currPriceValue}`] -= 1;
      console.log(chalk.bgYellowBright("This is sillage",priceValue))
      console.log(chalk.bgYellowBright("This is currPriceValue",currPriceValue))
      productCount.priceValue[`${priceValue}`] += 1;
      review.priceValue = priceValue;
    }
    console.log(chalk.red("Review"),review);

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
    const productReviewCount = await ProductReviewCount.findByIdAndDelete(
      req.params.id
    );
    if (!productReviewCount) {
      return res
        .status(404)
        .json({ message: "ProductReviewCount entry not found" });
    }
    res.status(204).send(); // No content to send back for successful deletion
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
