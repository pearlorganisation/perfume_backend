import mongoose from "mongoose";


const userGlobalCountSchema = new mongoose.Schema({
   
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'auth',
        required:[true,"User Id is required field !!"],
        index:true
    },

    perfumeMarkedVoted:{
        type:[{
            perfumeId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'perfume'
            },
            vote :{
                type:Number,
                enum:[1,0,-1],
                default:0
            }
        }],
        default:[]
    },

    pros:{
        type:[{
            prosId:{
              type: mongoose.Schema.Types.ObjectId,
              ref:'ProsCons'
            },
            vote :{
                type:Number,
                enum:[1,0,-1],
                default:0
            },
            
        }],
        default:[]
    },
    cons:{
        type:[{
            consId:{
              type: mongoose.Schema.Types.ObjectId,
              ref:'ProsCons'
            },
            vote :{
                type:Number,
                enum:[1,0,-1],
                default:0
            },
            
        }],
        default:[]
    }



    
});


export const userGlobalCountModel = mongoose.model('UserGlobalCount',userGlobalCountSchema);