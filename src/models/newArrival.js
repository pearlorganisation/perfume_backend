import mongoose from "mongoose";


const newArrivalSchema = new mongoose.Schema({
    perfumeName:{
        type:String
    },
    perfumeId:{
        type:mongoose.Schema.ObjectId,
        ref:"perfume"
    },
    banner:{
        type:String
    },
    
});





export const NewArrivalPerfume = mongoose.model('NewArrival',newArrivalSchema);