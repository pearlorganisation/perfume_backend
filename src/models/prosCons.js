import mongoose from "mongoose";

const proCon = new mongoose.Schema({    
    title:{
        type:String,
        required : [true,"Title for pros is required field !!"]
    },
    likesVote:{
        type:Number,
        default:0,
        min:[0,"Min Value For Likes/Dislike Vote Must be Above Or Equal to Zero"]
    },
    disLikesVote:{
        type:Number,
        default:0,
        min:[0,"Min Value For Likes/Dislike Vote Must be Above Or Equal to Zero"]

    }

})

const prosConsSchema = new mongoose.Schema({

    pros: {
       type:[proCon]
    },
    cons: {
        type:[proCon]
    },
    perfumeId: {
        type: mongoose.Types.ObjectId,
        ref: "perfume",
    },

},{timestamps:true});


export const ProsCons = mongoose.model('ProsCons', prosConsSchema);