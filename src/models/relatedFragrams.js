import mongoose from "mongoose";


const relatedFragramsSchema = new mongoose.Schema({
    perfumeName:{
        type:String,
        required: true
    },
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:"brand",
        required: true,
    },
    banner:{
        type:String,
        required: true
    },
    mapOfLinks:{
      type:Map,
      of:mongoose.Schema.Types.Mixed,
      required:true
    },
    perfume: {
        type: mongoose.Schema.ObjectId,
        ref: "perfume",
        required: true,
    }
}, {timestamps: true});


export const relatedFragrams = mongoose.model('relatedFragrams',relatedFragramsSchema, 'relatedFragrams');