import mongoose from "mongoose";
import { ProductReviewCount } from "./productReviewCount.js";
import perfume from "./perfume.js";
import { Comments } from "./comments.js";
import chalk from "chalk";
import errorResponse from "../utils/errorResponse.js";

const reviewsSchema = new mongoose.Schema(
  {
    perfume: { type: mongoose.Types.ObjectId, ref: "perfume", index: true },
    reviewBy: { type: mongoose.Types.ObjectId, ref: "auth", index: true },
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
    
    console.log(chalk.green(this))
    const perfumeDoc = await perfume.findOne({ _id: this.perfume }).exec();

    console.log(chalk.yellow(JSON.stringify(perfumeDoc)));

    if (perfumeDoc) {
      try {

        // this.productReviewCount = perfumeDoc.productReviewCoundId;
        const productCount = await ProductReviewCount.findById(
          perfumeDoc.productReviewCoundId
        );

        // Update reaction
        if (this.reaction) {
          productCount.reaction[`${this.reaction}`] += 1;
        }

        // Update season
        if (this.season) {
          productCount.season[`${this.season}`] += 1;
        }

        // Update longevity
        if (this.longevity) {
          productCount.longevity[`${this.longevity}`] += 1;
        }

        // Update sillage
        if (this.sillage) {
          productCount.sillage[`${this.sillage}`] += 1;
        }

        // Update gender
        if (this.gender) {
          productCount.gender[`${this.gender}`] += 1;
        }

        // Update price value
        if (this.priceValue) {
          productCount.priceValue[`${this.priceValue}`] += 1;
        }

        console.log(chalk.red(JSON.stringify(productCount)));
        await productCount.save({ runValidators: true });
      } catch (err) {
        next(err);
      }
    }
    next();
  }
});

// Update counts after saving
// reviewsSchema.post("save", async function (doc) {
//   try {
//     const previousValues = doc.previousValues || {};
//     const updates = {};
//     console.log("Post-save hook triggered", this.isNew);

//     if (!this.isNew) {
//       console.log(chalk.bgGrey("we came into is new "));
//     }

//     // Check if the document is new
//     if (this.isNew) {
//       // Creation: Increment counts for the new review attributes
//       if (doc.sillage) updates.sillage[`${doc.sillage}`] = 1;
//       if (doc.longevity) updates[`longevity.${doc.longevity}`] = 1;
//       if (doc.gender) updates[`gender.${doc.gender}`] = 1;
//       if (doc.priceValue) updates[`priceValue.${doc.priceValue}`] = 1;
//       if (doc.season) updates[`season.${doc.season}`] = 1;
//       if (doc.reaction) updates[`reaction.${doc.reaction}`] = 1;
//     } else {
//       // Update: Adjust counts based on previous and new values
//       // if (previousValues.sillage !== doc.sillage) {
//       //   if (previousValues.sillage)
//       //     updates[`sillage.${previousValues.sillage}`] = -1;
//       //   if (doc.sillage) updates[`sillage.${doc.sillage}`] = 1;
//       // }
//       // if (previousValues.longevity !== doc.longevity) {
//       //   if (previousValues.longevity)
//       //     updates[`longevity.${previousValues.longevity}`] = -1;
//       //   if (doc.longevity) updates[`longevity.${doc.longevity}`] = 1;
//       // }
//       // if (previousValues.gender !== doc.gender) {
//       //   if (previousValues.gender)
//       //     updates[`gender.${previousValues.gender}`] = -1;
//       //   if (doc.gender) updates[`gender.${doc.gender}`] = 1;
//       // }
//       // if (previousValues.priceValue !== doc.priceValue) {
//       //   if (previousValues.priceValue)
//       //     updates[`priceValue.${previousValues.priceValue}`] = -1;
//       //   if (doc.priceValue) updates[`priceValue.${doc.priceValue}`] = 1;
//       // }
//       // if (previousValues.season !== doc.season) {
//       //   if (previousValues.season)
//       //     updates[`season.${previousValues.season}`] = -1;
//       //   if (doc.season) updates[`season.${doc.season}`] = 1;
//       // }
//       // if (previousValues.reaction !== doc.reaction) {
//       //   if (previousValues.reaction)
//       //     updates[`reaction.${previousValues.reaction}`] = -1;
//       //   if (doc.reaction) updates[`reaction.${doc.reaction}`] = 1;
//       // }
//     }
//     console.log(chalk.yellow("updates", JSON.stringify(updates)));

//     if (this.isNew) {
//       // Apply updates to ProductReviewCount
//       if (Object.keys(updates).length > 0) {
//         console.log("this is product review count", this.productReviewCount);
//         const productReviewdata = await ProductReviewCount.findOneAndUpdate(
//           { _id: doc.productReviewCount },
//           { $inc: updates, totalVotes: 1 },
//           { upsert: true, new: true, setDefaultsOnInsert: true }
//         );
//         console.log(chalk.blue(JSON.stringify(productReviewdata)));
//       }
//       if (doc.commentsFields) {
//         const newComment = await Comments({
//           commentsFields: doc.commentsFields,
//           perfumeId: doc?.id || "Id is not defined over here ",
//           userId: doc.reviewBy,
//           commentGallery: doc.commentGallery,
//         });
//         console.log("New Comment Created", newComment);
//       }
//     }
//   } catch (err) {
//     console.error("Error updating ProductReviewCount:", err);
//   }
// });

reviewsSchema.index({ perfume: 1, reviewBy: 1 }, { unique: true });
export default mongoose.model("review", reviewsSchema, "review");
