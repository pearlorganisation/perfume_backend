import auth from "../models/auth.js";
import perfume from "../models/perfume.js";
import { ProsCons } from "../models/prosCons.js";
import { userGlobalCountModel } from "../models/userGlobalCounts.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";



export const addVoteToPerfumeProsCons = asyncHandler(async (req, res, next) => {
    const { prosConsId, userId, userVote, cons, pros } = req.body;
    
    console.log("req.body",req.body);
    if (!userId || !prosConsId) {
        return next(new errorResponse("Bad Request: IDs Not Provided!", 400));
    }

    const isUserExist = await auth.findById(userId).lean();
    const isPerfumeExist = await perfume.findOne({ prosConsId }).lean();
    const isProsConsExist = await ProsCons.findById( prosConsId ).lean();


    if (!isUserExist || !isProsConsExist || !isPerfumeExist) {
        return next(new errorResponse("User or Perfume Not Found!", 404));
    }

    if (!cons && !pros) {
        return next(new errorResponse("Pros OR Con NOT Found", 401));

    }

    let updateQuery;
    if (pros) {


        const userGlobalData = await userGlobalCountModel.findOne({ userId }).lean();
        const existingProsVote = userGlobalData.pros.find(el => el.prosId.toString() === pros);
        const {disLikesVote,likesVote} = isProsConsExist.pros.find((el)=> el._id.toString() === pros);


        if(existingProsVote?.vote === userVote) 
           return  res.status(200).json({ status:true,message: "Voting Saved!!" });
        
        if (existingProsVote ) {
            console.log("coming in existing vote");
            //user data 
            updateQuery = await userGlobalCountModel.findOneAndUpdate(
                { userId, 'pros._id': existingProsVote._id },
                { $set: { 'pros.$.vote': userVote } },
                { new: true }
            );

            console.log("updateQuery",updateQuery);


            if(userVote === -1)
            {
                const updateConsVote = await ProsCons.findOneAndUpdate(
                    { _id:prosConsId, 'pros._id': pros },
                    {$set: { 'pros.$.disLikesVote': disLikesVote + 1, 'pros.$.likesVote': likesVote - 1 }}
                    ,{new:true}
                );

                    console.log("updateConsVote dislike",updateConsVote)
            }
            else{

                
                const updateConsVote = await ProsCons.findOneAndUpdate(
                    { _id:prosConsId, 'pros._id': pros },
                    {$set: { 'pros.$.disLikesVote': disLikesVote - 1, 'pros.$.likesVote': likesVote + 1 }}
                ,{new:true} );

                    console.log("updateConsVote like",updateConsVote)
            }




            
        } else  {


            updateQuery = await userGlobalCountModel.findOneAndUpdate(
                { userId },
                { $push: { pros: { prosId: pros, vote: userVote } } },
                { new: true }
            );

            if (userVote === -1) {
                const updateConsVote = await ProsCons.findOneAndUpdate(
                    { _id:prosConsId, 'pros._id': pros },
                    { $set: { 'pros.$.disLikesVote': disLikesVote+1 } },
                    
                );

            console.log("updateConsVote disLikes",updateConsVote);

            }
            else{
                const updateConsVote = await ProsCons.findOneAndUpdate(
                    { _id:prosConsId, 'pros._id': pros },
                    { $set: { 'pros.$.likesVote': likesVote+1}},
                   
                );

                    console.log("updateConsVote likes ",updateConsVote);
            }



        }



    } else if (cons) {

        const userGlobalData = await userGlobalCountModel.findOne({ userId }).lean();
        const existingConsVote = userGlobalData.cons.find(el => el.consId.toString() === cons);
        const {disLikesVote,likesVote} = isProsConsExist.cons.find((el)=> el._id.toString() === cons);


        if(existingConsVote?.vote === userVote) 
           return  res.status(200).json({ status:true,message: "Voting Saved!!" });
        
        if (existingConsVote ) {
            console.log("coming in existing vote");
            //user data 
            updateQuery = await userGlobalCountModel.findOneAndUpdate(
                { userId, 'cons._id': existingConsVote._id },
                { $set: { 'cons.$.vote': userVote } },
                { new: true }
            );

            console.log("updateQuery",updateQuery);


            if(userVote === -1)
            {
                const updateConsVote = await ProsCons.findOneAndUpdate(
                    { _id:prosConsId, 'cons._id': cons },
                    {$set: { 'cons.$.disLikesVote': disLikesVote + 1, 'cons.$.likesVote': likesVote - 1 }}
                    ,{new:true}
                );

                    console.log("updateConsVote dislike",updateConsVote)
            }
            else{

                
                const updateConsVote = await ProsCons.findOneAndUpdate(
                    { _id:prosConsId, 'cons._id': cons },
                    {$set: { 'cons.$.disLikesVote': disLikesVote - 1, 'cons.$.likesVote': likesVote + 1 }}
                ,{new:true} );

                    console.log("updateConsVote like",updateConsVote)
            }




            
        } else  {


            updateQuery = await userGlobalCountModel.findOneAndUpdate(
                { userId },
                { $push: { cons: { consId: cons, vote: userVote } } },
                { new: true }
            );

            if (userVote === -1) {
                const updateConsVote = await ProsCons.findOneAndUpdate(
                    { _id:prosConsId, 'cons._id': cons },
                    { $set: { 'cons.$.disLikesVote': disLikesVote+1 } },
                    
                );

            console.log("updateConsVote disLikes",updateConsVote);

            }
            else{
                const updateConsVote = await ProsCons.findOneAndUpdate(
                    { _id:prosConsId, 'cons._id': cons },
                    { $set: { 'cons.$.likesVote': likesVote+1}},
                   
                );

                    console.log("updateConsVote likes ",updateConsVote);
            }



        }
    }

    if (updateQuery) {
        return res.status(200).json({ message: "Vote updated successfully.", data: updateQuery });
    }

    return res.status(400).json({ message: "Something went wrong!" });
});

export const addVoteToPerfume = asyncHandler(async (req, res, next) => {
    const { userId, perfumeId, userVote } = req.body;

    if (!userId || !perfumeId || !userVote) {
        return next(new errorResponse("UserId , PerfumeId, UserVote Not Found", 400));
    }

    const isPerfumeExists = await perfume.findById(perfumeId).lean();
    let updatedQuery;
    if (isPerfumeExists) {
        const userGlobalCountData = await userGlobalCountModel.findOne({ userId }).lean();
        const isPerfumeVoteExists = userGlobalCountData.perfumeMarkedVoted.find((el => el.perfumeId.toString() === perfumeId));


        if (isPerfumeVoteExists) {
            updatedQuery = await userGlobalCountModel.findOneAndUpdate({
                userId, 'perfumeMarkedVoted._id': isPerfumeVoteExists._id
            }, {
                $set: { 'perfumeMarkedVoted.$.vote': userVote }
            }, {
                new: true
            })


            if ((isPerfumeVoteExists.vote !== userVote) && userVote === -1) {
                //   console.log("updatedUserVote",updatedUserVote);
                const updatedPerfumeVote = await perfume.findByIdAndUpdate(perfumeId, {
                    $set: { dislike: isPerfumeExists.dislike + 1, likes: isPerfumeExists.likes - 1 }
                }, {
                    new: true
                });

                console.log(updatedPerfumeVote, "updatedPerfumeVote");
            }
            else if (isPerfumeVoteExists.vote !== userVote) {
                const updatedPerfumeVote = await perfume.findByIdAndUpdate(perfumeId, {
                    $set: { likes: isPerfumeExists.likes + 1, dislike: isPerfumeExists.dislike - 1 },
                }, {
                    new: true
                });



                console.log(updatedPerfumeVote, "updatedPerfumeVote");

            }
        }
        else {

            updatedQuery = await userGlobalCountModel.findOneAndUpdate({ userId }, {
                $push: { perfumeMarkedVoted: { perfumeId, vote: userVote } },

            }, {
                new: true
            });

            if (userVote === -1) {
                const updatedPerfumeVote = await perfume.findByIdAndUpdate(perfumeId, {
                    $set: { dislike: isPerfumeExists.dislike + 1 }
                }, {
                    new: true
                });
                console.log(updatedPerfumeVote, "updatedPerfumeVote");
            } else {
                const updatedPerfumeVote = await perfume.findByIdAndUpdate(perfumeId, {
                    $set: { likes: isPerfumeExists.likes + 1 }
                }, {
                    new: true
                });
                console.log(updatedPerfumeVote, "updatedPerfumeVote");
            }




        }




        return res.status(200).json({ status: true, message: "Perfume Vote Done Successfully !!", updatedQuery })
    }

    res.status(404).json({ status: false, message: "Something went wrong" });

})
