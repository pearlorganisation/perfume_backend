import mongoose from "mongoose";

const prosConsSchema = new mongoose.Schema({

    pros: {
        type: [{}],
    },
    cons: {
        type: [{}],
    },
    perfumeId: {
        type: mongoose.Types.ObjectId,
        ref: "perfume"
    },
    likes: {
        type: Number,
        default: 0
    },
    diskLikes: {
        type: Number,
        default: 0
    }

});


export const ProsCons = mongoose.model('ProsCons', prosConsSchema);