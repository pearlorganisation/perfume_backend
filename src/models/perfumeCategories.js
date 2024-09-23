import mongoose from "mongoose";


const perfumeCategoriesSchema = new mongoose.Schema({
    perfumeName:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true,
    },
    priceMl:{
        type:String,
        required: true
    },
    link: {
        type: String,
        required: true
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


export const perfumeCategories = mongoose.model('perfumeCategories',perfumeCategoriesSchema, 'perfumeCategories');