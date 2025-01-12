import perfume from "../models/perfume.js";
import { TopRatedPerfume } from "../models/topRatedPerfume.js"; // Adjust the import path as necessary
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

// Create a new top-rated perfume
export const createTopRatedPerfume = asyncHandler(async (req, res, next) => {
  // console.log(req.body.topRatedPerfume);

  if (req.body.topRatedPerfume && Array.isArray(req.body.topRatedPerfume)) {
    try {
      let topRatedPerfumeData = req.body?.topRatedPerfume || [];
      topRatedPerfumeData = topRatedPerfumeData.map((data) => {
        return {
          perfumeId: data.value,
        };
      });

      // console.log(topRatedPerfumeData,"topRatedPerfumeData")
      if (topRatedPerfumeData.length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Bad Request Empty Array " });
      }

      const data = await TopRatedPerfume.insertMany(topRatedPerfumeData);

      res.status(201).json({
        status: true,
        message: "Top Rated Perfumes Created Successfully",
        data,
      });
    } catch (error) {
      if (error.code === 11000) {
        console.error("Duplicate key error:", error.message);
        return next(
          new errorResponse("These Perfumes are already in Top Perfume !!", 409)
        );
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

    const data = await TopRatedPerfume.create({
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
export const getAllTopRatedPerfumes = asyncHandler(async (req, res, next) => {
  const topRatedPerfumes = await TopRatedPerfume.aggregate([
    {
      $lookup: {
        from: "perfume",
        localField: "perfumeId",
        foreignField: "_id",
        as: "perfumeData",
      },
    },
    {
      $unwind: "$perfumeData",
    },
    {
      $project: {
        _id: "$_id",
        perfumeId: "$perfumeData._id",
        perfumeName: "$perfumeData.perfume",
        banner: "$perfumeData.banner",
        slug: "$perfumeData.slug",
      },
    },
  ]);
  res.status(200).json(topRatedPerfumes);
});

export const getAllTopRatedPerfumesForAdmin = asyncHandler(
  async (req, res, next) => {
    const { Page, Limit, Search } = req.query;

    let page = 1;
    let limit = 10;
    let search = "";

    if (Page) {
      page = Math.max(page, Page);
    }
    if (Limit) {
      limit = Math.max(limit, Limit);
    }
    if (Search) {
      search = Search;
    }

    let skip = (page - 1) * limit;

    const totalDocuments = await TopRatedPerfume.aggregate([
      {
        $lookup: {
          from: "perfume",
          localField: "perfumeId",
          foreignField: "_id",
          as: "perfumeData",
        },
      },
      { $match: { "perfumeData.perfume": { $regex: search, $options: "i" } } },
      { $skip: skip },
      { $limit: limit },
      {
        $count: "totalDocument",
      },
    ]);

    let totalPage = 0;
    const allDocumentsCount = totalDocuments[0].totalDocument;
    if (totalDocuments.length > 0 && totalDocuments[0].totalDocument) {
      totalPage = Math.ceil(allDocumentsCount / limit);
    }

    const topRatedPerfumes = await TopRatedPerfume.aggregate([
      {
        $lookup: {
          from: "perfume",
          localField: "perfumeId",
          foreignField: "_id",
          as: "perfumeData",
        },
      },
      { $match: { "perfumeData.perfume": { $regex: search, $options: "i" } } },
      {
        $unwind: "$perfumeData",
      },
      {
        $project: {
          _id: "$_id",
          perfumeId: "$perfumeData._id",
          perfumeName: "$perfumeData.perfume",
          banner: "$perfumeData.banner",
        },
      },
    ]);

    res.status(200).json({
      status: true,
      message: "Top Rated Perfume Fetched Successfully !!",
      totalDocuments: allDocumentsCount,
      totalPage,
      topRatedPerfumes,
    });
  }
);

// Retrieve a single top-rated perfume by ID
export const getTopRatedPerfumeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const topRatedPerfume = await TopRatedPerfume.findById(id).lean();

  if (!topRatedPerfume) {
    return res.status(404).json({ message: "TopRatedPerfume not found" });
  }

  res.status(200).json({
    status: true,
    message: "Top Rated Perfume Fetched Successfully !!",
    topRatedPerfume,
  });
});

// Update a top-rated perfume by ID --pending
export const updateTopRatedPerfume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Find and update the top-rated perfume
  const updatedTopRatedPerfume = await TopRatedPerfume.findByIdAndUpdate(
    id,
    updates,
    { new: true }
  );

  if (!updatedTopRatedPerfume) {
    return res.status(404).json({ message: "TopRatedPerfume not found" });
  }

  res.status(200).json(updatedTopRatedPerfume);
});

// Delete a top-rated perfume by ID
export const deleteTopRatedPerfume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTopRatedPerfume = await TopRatedPerfume.findByIdAndDelete(id);

  if (!deletedTopRatedPerfume) {
    return res.status(404).json({ message: "TopRatedPerfume not found" });
  }

  res
    .status(200)
    .json({ status: true, message: "TopRatedPerfume deleted successfully" });
});
