import mongoose from "mongoose";

const proCon = new mongoose.Schema({    
    title:{
        type:String,
        required : [true,"Title for pros is required field !!"]
    },
    likesVote:{
        type:Number,
        default:0
    },
    disLikesVote:{
        type:Number,
        default:0
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