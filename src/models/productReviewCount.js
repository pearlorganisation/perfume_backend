import mongoose from "mongoose";

const productReviewCountSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Types.ObjectId
    },
    reaction:{
        worst:{ type: Number, default: 0 },
        good:{ type: Number, default: 0 },
        notGood:{ type: Number, default: 0 },
        fine:{ type: Number, default: 0 },
        veryGood:{ type: Number, default: 0 },
    },
    sillage: {
        noVote: { type: Number, default: 0 },
        intimate: { type: Number, default: 0 },
        moderate: { type: Number, default: 0 },
        strong: { type: Number, default: 0 },
        enormous: { type: Number, default: 0 },
    },
    longevity: {
        noVote: { type: Number, default: 0 },
        veryWeak: { type: Number, default: 0 },
        weak: { type: Number, default: 0 },
        moderate: { type: Number, default: 0 },
        longLasting: { type: Number, default: 0 },
        eternal: { type: Number, default: 0 },
    },
    gender: {
        male: { type: Number, default: 0 },
        moreMale: { type: Number, default: 0 },
        unisex: { type: Number, default: 0 },
        moreFemale: { type: Number, default: 0 },
        female: { type: Number, default: 0 },
    },
    priceValue: {
        wayOverPriced: { type: Number, default: 0 },
        overPriced: { type: Number, default: 0 },
        ok: { type: Number, default: 0 },
        goodValue: { type: Number, default: 0 },
        greatValue: { type: Number, default: 0 },
    },
    season: {
        spring: { type: Number, default: 0 },
        summer: { type: Number, default: 0 },
        fall: { type: Number, default: 0 },
        day: { type: Number, default: 0 },
        night: { type: Number, default: 0 },
    },
    totalVotes: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

export const ProductReviewCount = mongoose.model('ProductReviewCount', productReviewCountSchema);
