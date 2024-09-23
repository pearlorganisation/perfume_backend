import mongoose from "mongoose";


const fragramsSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    postBy:{
        type:String,
        required: true,
    },
    link: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
        required: true,
    },
    banner: {
        type: String,
        required: true
    },
    perfume: {
        type: mongoose.Schema.ObjectId,
        ref: "perfume",
        required: true,
    }
}, {timestamps: true});


export const fragrams = mongoose.model('fragrams',fragramsSchema, 'fragrams');