import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    logo:{
     type:String,
     default:"https://t3.ftcdn.net/jpg/07/40/66/04/360_F_740660413_jMpbvqGDfKQfBfncRYnZRJT70rIRHIaX.jpg"
    },
    title:{
        type:String,
        minlength: [5, "Min Required Length is 10!!"],
        maxlength: [100, "Max Required Length is 150!!"],
        required:[true,"Comment Title is Required Field"]
    },    
    description: {
        type: String,
        minlength: [10, "Min Required Length is 10!!"],
        maxlength: [150, "Max Required Length is 150!!"],
        required:[true,"Description  is Required Field"]

    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "perfume",
    },
    perfumeId: {
        type: mongoose.Types.ObjectId,
        ref: "perfume",
        // required:[true,"PerfumeId is required field "]
    },
    commentGallery: {
        type: [{}]
    },
    likes:{
        type:Number,
        default:0
    },
    disLikes:{
        type:Number,
        default:0
    }
},{
    timestamps: true
    });


    


export const Comments = mongoose.model('Comments', commentSchema);