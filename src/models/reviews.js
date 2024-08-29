import mongoose from "mongoose";
import { ProductReviewCount } from "./productReviewCount.js";
import perfume from "./perfume.js";

const reviewsSchema = new mongoose.Schema(
  {
    perfume: { type: mongoose.Types.ObjectId, ref: "perfume" },
    reviewBy: { type: mongoose.Types.ObjectId, ref: "auth" },
    reaction: {
      name: {
        type: String,
        enum: ["worst", "good", "notGood", "fine", "veryGood"],
        // required: true,
        default:"good"
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },
    season: {
      type:String,
      enum:["spring","summer","fall","day","night"]
      
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

    productReviewCount:{
      type:mongoose.Types.ObjectId,ref:"ProductReviewCount"
    },
    // review: [
    //   {
    //     review: String,
    //     gallery: [String],
    //   },
    // ],
    // pros: [
    //   {
    //     pros: mongoose.Types.ObjectId,
    //     isLiked: Boolean,
    //   },
    // ],
    // cons: [
    //   {
    //     cons: mongoose.Types.ObjectId,
    //     isLiked: Boolean,
    //   },
    // ],
  },
  { timestamps: true }
);

// Store previous values before update
// Set productReviewCount before saving a review
reviewsSchema.pre('save', async function (next) {

  if (!this.isNew) {
    try {
      const perfumeDoc = await perfume.findById(this.perfume).exec();
      if (perfumeDoc) {
        this.productReviewCount = perfumeDoc.productReviewCoundId;
         console.log(this,"shasshaj");
        this.previousValues = {
          sillage: perfumeDoc.sillage,
          longevity: perfumeDoc.longevity,
          gender: perfumeDoc.gender,
          priceValue: perfumeDoc.priceValue,
          season: perfumeDoc.season,
        };
      }
      next();
    } catch (err) {
      next(err);
    }
  } else {
    const perfumeDoc = await perfume.findById(this.perfume).exec();
    if (perfumeDoc) {
      console.log(this,"shasshaj","perfuyfufh",perfumeDoc);

      this.totalVotes++;
      this.productReviewCount = perfumeDoc.productReviewCoundId;

    }
    next();
  }
});

// Update counts after saving
reviewsSchema.post('save', async function (doc) {

  try {
    const previousValues = doc.previousValues || {};
    const updates = {};
    // console.log('Post-save hook triggered', doc);


    // Check if the document is new
    if (this.isNew) {
      // Creation: Increment counts for the new review attributes
      if (doc.sillage) updates[`sillage.${doc.sillage}`] = 1;
      if (doc.longevity) updates[`longevity.${doc.longevity}`] = 1;
      if (doc.gender) updates[`gender.${doc.gender}`] = 1;
      if (doc.priceValue) updates[`priceValue.${doc.priceValue}`] = 1;
      if (doc.season) updates[`season.${doc.season}`] = 1;
    } else {
      // Update: Adjust counts based on previous and new values
      if (previousValues.sillage !== doc.sillage) {
        if (previousValues.sillage) updates[`sillage.${previousValues.sillage}`] = -1;
        if (doc.sillage) updates[`sillage.${doc.sillage}`] = 1;
      }
      if (previousValues.longevity !== doc.longevity) {
        if (previousValues.longevity) updates[`longevity.${previousValues.longevity}`] = -1;
        if (doc.longevity) updates[`longevity.${doc.longevity}`] = 1;
      }
      if (previousValues.gender !== doc.gender) {
        if (previousValues.gender) updates[`gender.${previousValues.gender}`] = -1;
        if (doc.gender) updates[`gender.${doc.gender}`] = 1;
      }
      if (previousValues.priceValue !== doc.priceValue) {
        if (previousValues.priceValue) updates[`priceValue.${previousValues.priceValue}`] = -1;
        if (doc.priceValue) updates[`priceValue.${doc.priceValue}`] = 1;
      }
      if (previousValues.season !== doc.season) {
        if (previousValues.season) updates[`season.${previousValues.season}`] = -1;
        if (doc.season) updates[`season.${doc.season}`] = 1;
      }
    }

    // Apply updates to ProductReviewCount
    if (Object.keys(updates).length > 0) {
      console.log("this is product review count",doc.productReviewCount)
      const data = await ProductReviewCount.findOneAndUpdate(
        { _id: doc.productReviewCount },
        { $inc: updates },
        {
          $totalVotes:doc.totalVotes
        },
        {upsert: true, new: true, setDefaultsOnInsert: true} 
      );

      console.log(data,"this is data !!!");
    }
  } catch (err) {
    console.error('Error updating ProductReviewCount:', err);
  }
});






export default mongoose.model("review", reviewsSchema, "review");
