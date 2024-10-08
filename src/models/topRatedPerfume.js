import mongoose from "mongoose";


const topRatedSchema = new mongoose.Schema({

    perfumeId:{
        type:mongoose.Schema.ObjectId,
        ref:"perfume"
    },

},{timestamps:true});





export const TopRatedPerfume = mongoose.model('TopRatedPerfume',topRatedSchema);