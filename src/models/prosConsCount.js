import mongoose from "mongoose";

const prosConsCountSchema = mongoose.Schema({
     
    prosConsId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProsCons'
    },
    perfumeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"perfume"
    },
    pros:{
        likes:{
            type:Number,
            default:0
        },
        disLikes:{
            type:Number,
            default:0
        }
    },
    cons:{
        likes:{
            type:Number,
            default:0
        },
        disLikes:{
            type:Number,
            default:0
        }
    }


},{timestamps:true});



export const ProsConsCount = mongoose.model('ProsConsCount', prosConsCountSchema);