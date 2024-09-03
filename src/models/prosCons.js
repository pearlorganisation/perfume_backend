import mongoose from "mongoose";

const proCon = new mongoose.Schema({
    title:{
        type:String,
        required : [true,"Title for pros is required field !!"]
    },
    likes:{
        type:Number,
        default:0
    },
    disLikes:{
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
        ref: "perfume"
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"auth"
    }


});


export const ProsCons = mongoose.model('ProsCons', prosConsSchema);