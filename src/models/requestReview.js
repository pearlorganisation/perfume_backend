import mongoose from "mongoose";


const requestReviewSchema = new mongoose.Schema({
   perfumeName:{
    type:String,
    minlength: [3,"Perfume Name should be greater than 3 Letters or more than that"],
    maxlength:[300,"Perfume Name should be less than 300 Letters"]
   },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'auth'
   },
   description:{
    type:String,
    minlength: [5,"Perufume description should be greater than  5 Letters"],
    maxlength: [1000,"Perufume description should be greater than  1000 Letters"],
   },
   status:{
    type:String,
    enum:["approved","discarded","pending"],
    default:"pending"
   }
});


export const RequestReviewSchema = new mongoose.model('RequestReview',requestReviewSchema)