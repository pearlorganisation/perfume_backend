import mongoose from "mongoose";


const newArrivalSchema = new mongoose.Schema({
    perfumeName:{
        type:String,
        required: true
    },
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:"brand"
    },
    banner:{
        type:String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
    
}, {timestamps: true});


export const NewArrivalPerfume = mongoose.model('NewArrival',newArrivalSchema, 'NewArrival');