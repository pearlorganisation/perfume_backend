import {  NewArrivalPerfume } from "../models/newArrival.js";
import perfume from "../models/perfume.js";
import reviews from "../models/reviews.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

// Create a new top-rated perfume
export const createNewArrivalPerfume = asyncHandler(async (req, res, next) => {
  console.log(req.body.newArrivalPerfume);

  if (req.body.newArrivalPerfume && Array.isArray(req.body.newArrivalPerfume)) {
    try {
      let newArrivalPerfumeData = req.body?.newArrivalPerfume || [];
      newArrivalPerfumeData = newArrivalPerfumeData.map((data) => {
        return {
          ...data,
          perfumeId: data.value,
          perfumeName: data.label,
        };
      });
      console.log("shashank", newArrivalPerfumeData);
      const data = await NewArrivalPerfume.insertMany(newArrivalPerfumeData);

      console.log(data, "Data inserted successfully");
      res.status(201).json({
        status: true,
        message: "Top Rated Perfumes Created Successfully",
        data,
      });
    } catch (error) {
      if (error.code === 11000) {
        console.error("Duplicate key error:", error.message);
        return next(
          new errorResponse(
            "Duplicate Entry Intiated By User Product Id Already Exist !!",
            409
          )
        ); // Adjust status code if needed
      }

      // Handle other errors
      console.error("Error inserting documents:", error);
      return next(
        new errorResponse("An error occurred while inserting documents", 500)
      ); // Internal server error
    }
  } else {
    const { gallery, banner, logo } = req?.files;

    const {
      purchaseLinks,
      mainAccords,
      middleNote,
      topNote,
      baseNote,
      pros,
      ratingFragrams,
      cons,
    } = req?.body;

    console.log("here is the jhdsgjhsdgf", req.body.ratingFragrams);

    const newPerfume = new perfume({
      ...req?.body,
      banner: banner[0]?.path,
      gallery,
      ratingFragrams: JSON.parse(ratingFragrams),
      pros: JSON.parse(pros),
      cons: JSON.parse(cons),
      logo: logo[0].path,
      purchaseLinks: JSON.parse(purchaseLinks),
      mainAccords: JSON.parse(mainAccords),
      middleNote: JSON.parse(middleNote),
      topNote: JSON.parse(topNote),
      baseNote: JSON.parse(baseNote),
    });
    await newPerfume.save();

    const data = await NewArrivalPerfume.create({
      perfumeId: newPerfume?._id || "Id reh gayi !!!",
      perfumeName: newPerfume?.perfume || "something is wrong in payload man ",
      banner: newPerfume?.banner || "something is wrong in payload man ",
    });

    console.log(data, "we came here in else block");
  }

  res
    .status(201)
    .json({ status: true, message: "Top Rated Perfume Created Successfully" });
});

// Retrieve all top-rated perfumes
export const getAllNewArrivalPerfume = asyncHandler(async (req, res,next) => {
     
  const NewArrivalPerfumeData = await NewArrivalPerfume.find().lean();
  console.log(NewArrivalPerfumeData);
  res.status(200).json({status:true,message:"Data Fetched Successfully ",data:NewArrivalPerfumeData});
});

// Retrieve a single top-rated perfume by ID
export const getAllNewArrivalPerfumeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newArrivalPerfumeData = await NewArrivalPerfume.findById(id).lean();

  if (!newArrivalPerfumeData) {
    res.status(404).json({ message: "NewArrivalPerfume not found" });
  }

  res.status(200).json({status:true,message:"NewArrivalPerfumes Found Successfully ",data:topRatedPerfume});
});

// Update a top-rated perfume by ID --pending
export const updateAllNewArrivalPerfume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Find and update the top-rated perfume
  const updatedNewArrivalPerfume = await NewArrivalPerfume.findByIdAndUpdate(
    id,
    updates,
    { new: true }
  );

  if (!updatedNewArrivalPerfume) {
    res.status(404).json({status:false,message: "NewArrivalPerfumes not found"});
  }

  res.status(200).json({status:true,message:"NewArrivalPerfumes Updated Successfully",updatedNewArrivalPerfume});
});

// Delete a top-rated perfume by ID
export const deleteAllNewArrivalPerfume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deletedNewArrivalPerfume = await NewArrivalPerfume.findByIdAndDelete(id);

//   const deletePerfume = await perfume.findByIdAndDelete(
//     deletedTopRatedPerfume.perfumeId
//   );
//   const deleteReviewCount = await reviews.findByIdAndDelete(
//     deletePerfume.productReviewCoundId
//   );

  console.log("deleteReviewCount");

  if (!deletedNewArrivalPerfume) {
    res.status(404).json({ message: "NewArrivalePerfume not found" });
  }

  res.status(200).json({status:true,message: "NewArrivalePerfume deleted successfully" });
});
