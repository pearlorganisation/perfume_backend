import { newsLetterModel } from "../models/newsLetter.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { subscribeNewsLetter } from "../utils/sendMail.js";


export const createNewsLetter = asyncHandler(async (req,res,next)=>{
    const {email} = req.body;
    
    if(!email)
        return res.status(400).json({status:false,message:"Email Is Required Field !!"});


    const emailExists = await newsLetterModel.findOne({email}).lean();

    if(emailExists)
    {
        return res.status(400).json({status:false,message:"Email Is Already Subscribed !!"});
    }
    
    const info = await subscribeNewsLetter({email});

    if(info?.rejected?.length > 0)
    {
        return res.status(400).json({status:false,message:"Email Not Found !!"});
    }
    
    await newsLetterModel.create({email});

    res.status(200).json({status:true,message:"Email Subscribed Successfully !!"});
 

    
});

export const unSubscribeNewsLetter = asyncHandler(async (req,res,next)=>{
    const {email} = req.query;

    if(!email)
    {
        return res.status(400).json({status:false,message:"Email Is Required Field !!"});
    }

    const isEMailExists = await newsLetterModel.findOne({email}).lean();

    if(!isEMailExists)
    {
    return res.status(200).json({status:false,message:"Email Unsubscribed !!"});
    }

    await newsLetterModel.findOneAndDelete({email});
    
    return res.send(`<h1>NewsLetter Unsubscribed Successfully !! </h1>`)


})