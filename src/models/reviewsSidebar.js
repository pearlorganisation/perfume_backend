import mongoose from "mongoose";

const reviewsSidebarSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Types.ObjectId
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    reviewBy: {
        type: String,
        required: true,
    },
    perfumeId: {
        type: mongoose.Types.ObjectId,
        ref: "perfume",
    },
    banner: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export const reviewsSidebarModel = mongoose.model('reviewsSidebar', reviewsSidebarSchema, "reviewsSidebar");
