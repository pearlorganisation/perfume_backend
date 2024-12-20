import mongoose from "mongoose";
import { ProductReviewCount } from "./productReviewCount.js";
import perfume from "./perfume.js";
import { Comments } from "./comments.js";
import chalk from "chalk";
import errorResponse from "../utils/errorResponse.js";

const reviewsSchema = new mongoose.Schema(
  {
    perfume: { type: mongoose.Types.ObjectId, ref: "perfume"},
    reviewBy: { type: mongoose.Types.ObjectId, ref: "auth" },
    isApproved: {
      type: Boolean,
      default: false,
    },
    reaction: {
      type: String,
      enum: ["worst", "good", "notGood", "fine", "veryGood"],
    },
    season: {
      type: String,
      enum: ["spring", "summer", "fall", "day", "night", "winter"],
    },
    notes: [{ type: mongoose.Types.ObjectId, ref: "notes" }],
    longevity: {
      type: String,
      enum: [
        "noVote",
        "veryWeak",
        "weak",
        "moderate",
        "longLasting",
        "eternal",
      ],
    },
    sillage: {
      type: String,
      enum: ["noVote", "intimate", "moderate", "strong", "enormous"],
    },
    gender: {
      type: String,
      enum: ["male", "moreMale", "unisex", "moreFemale", "female"],
    },
    priceValue: {
      type: String,
      enum: ["wayOverPriced", "overPriced", "ok", "goodValue", "greatValue"],
    },
    productReviewCount: {
      type: mongoose.Types.ObjectId,
      ref: "ProductReviewCount",
    },
    commentsId: {
      type: mongoose.Types.ObjectId,
      ref: "Comments",
    },
    commentsFields: {
      logo: {
        type: String,
        default:
          "https://t3.ftcdn.net/jpg/07/40/66/04/360_F_740660413_jMpbvqGDfKQfBfncRYnZRJT70rIRHIaX.jpg",
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    commentGallery: {
      type: [{}],
    },
  },
  { timestamps: true }
);

// Store previous values before update
// Set productReviewCount before saving a review
reviewsSchema.pre("save", async function (next) {
  if (!this.isNew) {
    try {
      next();
    } catch (err) {
      next(err);
    }
  } else {
    
    console.log(chalk.yellow("This is id ",this))

    // const perfumeDoc = await perfume.findOne({ _id: this.perfume }).exec();


    // if (perfumeDoc) {
    //   try {
        
    //     const productCount = await ProductReviewCount.findById(
    //       perfumeDoc.productReviewCoundId
    //     );

    //     // Update reaction
    //     if (this.reaction) {
    //       productCount.reaction[`${this.reaction}`] += 1;
    //     }

    //     // Update season
    //     if (this.season) {
    //       productCount.season[`${this.season}`] += 1;
    //     }

    //     // Update longevity
    //     if (this.longevity) {
    //       productCount.longevity[`${this.longevity}`] += 1;
    //     }

    //     // Update sillage
    //     if (this.sillage) {
    //       productCount.sillage[`${this.sillage}`] += 1;
    //     }

    //     // Update gender
    //     if (this.gender) {
    //       productCount.gender[`${this.gender}`] += 1;
    //     }

    //     // Update price value
    //     if (this.priceValue) {
    //       productCount.priceValue[`${this.priceValue}`] += 1;
    //     }

    //     console.log(chalk.red(JSON.stringify(productCount)));
    //     await productCount.save({ runValidators: false });
    //   } catch (err) {
    //     next(err);
    //   }
    // }
    next();
  }
});


reviewsSchema.index({ perfume: 1, reviewBy: 1 }, { unique: true });
export default mongoose.model("review", reviewsSchema, "review");
