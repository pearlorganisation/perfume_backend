import mongoose from "mongoose";

const newsLetterSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email Is Required Field !!"]
    }
},{
    timestamps:true
});

export const newsLetterModel = mongoose.model('NewsLetter',newsLetterSchema);