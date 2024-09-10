import mongoose from "mongoose";


const writeReviewSchema = new mongoose.Schema({
   perfumeName:{
    type:String,
    minlength: [3,"Perufume Name should be greater than 3 Words or more than that"],
    maxlength:[150,"Perufume Name should be less than 150 Words"]
   },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'auth',
    required:[true,"UserId is required field !!"],
   },
   images:{
    type:[{}],
   },
   description:{
    type:String,
    minlength: [5,"Perfume description should be greater than  5 Words"],
    maxlength: [350,"Perfume description should be greater than  150 Words"],
   },
   status:{
    type:String,
    enum:["approved","discarded","pending"],
    default:"pending"
   }
});


export const WriteReviewSchema = new mongoose.model('WriteReview',writeReviewSchema)