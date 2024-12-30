import mongoose from "mongoose";

const ratingFragramSchema = new mongoose.Schema({
  longitivity: {
    min: 0,
    max: 10,
    type: Number,
    required: [true, "Required Field"],
  },
  sillage: {
    min: 0,
    max: 10,
    type: Number,
    required: [true, "Required Field"],
  },
  compliment: {
    min: 0,
    max: 10,
    type: Number,
    required: [true, "Required Field"],
  },
  overall: {
    min: 0,
    max: 10,
    type: Number,
    required: [true, "Required Field"],
  },
  pricing: {
    type: Number,
    min: 0,
    max: 10,
    required: [true, "Required Field"],
  },
  gender: {
    type: String,
    required: [true, "Required Field"],
    maxlength: 1,
    enum: ["M", "F", "O"],
  },

});

const mapOfLinksSchema = new mongoose.Schema({
  link:String,
  company:String,
  companyImage:String,
  price:String
})
const proConSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title for pros or cons is a required field!"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  disLikes: {
    type: Number,
    default: 0,
  },
});

import { ProductReviewCount } from "./productReviewCount.js";
import { ProsCons } from "./prosCons.js";
import { Comments } from "./comments.js";

const perfumeSchema = new mongoose.Schema(
  {
    perfume: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    reviewBy: {
      type: String,
      // required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
    brandAltAttribute: {
      type: String,
    },
    mainImageAltAttribute: {
      type: String,
    },
    banner: {
      type: String,
      required: true,
    },
    video: {
      type: [],
    },
    details: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mapOfLinks: {
      type: Map,
      of:[mapOfLinksSchema],
      required: true,
    },
    gallery: [{}],
    purchaseLinks: {
      type: [{}],
    },
    pros: {
      type: [proConSchema],
    },
    cons: {
      type: [proConSchema],
    },
    prosConsId: {
      type: mongoose.Types.ObjectId,
      ref: "ProsCons",
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    slug:{
      type:String
    },
    keywords:{
      type:[]
    },
    mainAccords: [{ name: String, color: String, percentage: Number }],

    baseNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    topNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    middleNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    ratingFragrams: {
      type: ratingFragramSchema,
    },
    productReviewCoundId: {
      type: mongoose.Types.ObjectId,
    },
    slug: {
      type: String,
    },
    keywords: {
      type: [],
    },
  },
  { timestamps: true }
);

perfumeSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      console.log("we are coming here man");
      // Create a new ProductReviewCount document
      const newCount = await ProductReviewCount.create({
        totalVotes: 0,
        productId: this._id,
      });

      const newProsCons = await ProsCons.create({
        pros: this.pros,
        cons: this.cons,
        perfumeId: this.id,
      });

      // Assign the _id of the new ProductReviewCount document to productReviewCoundId
      this.productReviewCoundId = newCount._id;
      this.prosConsId = newProsCons._id;

      next(); // Proceed with saving the perfume document
    } catch (error) {
      next(error); // Handle errors
    }
  } else {
    next();
  }
});

//deletion of perfume

perfumeSchema.post("remove", async function () {
  try {
    const productReviewCountDocument =
      await ProductReviewCount.findByIdAndDelete(doc.productReviewCountId);
    const prosConsDocument = await ProsCons.findByIdAndDelete(doc.prosConsId);

    console.log(
      productReviewCountDocument,
      "ProductReviewCount Document Deleted!!"
    );
    console.log(prosConsDocument, "ProsCons Document Deleted!!");

    const commentsDeleted = await Comments.deleteMany({ perfumeId: doc._id });
    console.log("All Comments Deleted", commentsDeleted);
  } catch (error) {
    console.error("Error during post-remove:", error);
  }
});

export default mongoose.model("perfume", perfumeSchema, "perfume");
