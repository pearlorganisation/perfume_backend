import mongoose from "mongoose";


const topRatedSchema = new mongoose.Schema({
    perfumeName:{
        type:String
    },
    perfumeId:{
        type:mongoose.Schema.ObjectId,
        ref:"perfume"
    },
    banner:{
        type:String
    }
});





export const TopRatedPerfume = mongoose.model('TopRatedPerfume',topRatedSchema);