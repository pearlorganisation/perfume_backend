import brand from "../models/brand.js";
import perfume from "../models/perfume.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import errorResponse from "../utils/errorResponse.js";

export const newBrand = asyncHandler(async (req, res, next) => {
  const newBrand = new brand(req?.body);
  await newBrand.save();
  const data = await brand.find();
  res.status(201).json({ status: true, message: "Created successfully!!" });
});

export const getAllBrands = asyncHandler(async (req, res, next) => {
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

  const totalDocuments = await brand
    .countDocuments({ brand: { $regex: search, $options: "i" } })
    .lean();
  const totalPage = Math.ceil(totalDocuments / limit);

  if (Limit === "infinite") {
    limit = totalDocuments;
  }
  const data = await brand
    .find({ brand: { $regex: search, $options: "i" } })
    .skip(skip)
    .limit(limit)
    .lean();
  res.status(200).json({ status: true, data, totalDocuments, totalPage });
});

export const getAllBrandsMenu = asyncHandler(async (req, res, next) => {
  const pipeLine = [
    {
      $lookup: {
        from: "perfume",
        localField: "_id",
        foreignField: "brand",
        as: "AllPerfume",
      },
    },
    {
      $project: {
        brand: 1,
        AllPerfume: {
          perfume: 1,
          _id: 1,
        },
      },
    },
  ];
  const data = await brand.aggregate(pipeLine).exec();
  res.status(200).json({ status: true, data });
});

export const getSingleBrandPerfumes = asyncHandler(async (req, res) => {
  const { brandName } = req?.params;
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

  const brandData = await brand.findOne({ brand: brandName });
  if (!brandData) {
    return res.status(404).json({ message: "Brand not found" });
  }

  const totalDocuments = await perfume
    .countDocuments({
      brand: brandData._id,
      perfume: { $regex: search, $options: "i" },
    })
    .lean();

  const totalPage = Math.ceil(totalDocuments / limit);

  if (Limit === "infinite") {
    limit = totalDocuments;
  }

  // Find perfumes that match the brand ID
  const perfumes = await perfume
    .find({ brand: brandData._id, perfume: { $regex: search, $options: "i" } })
    .sort({ createdAt: -1 })
    .select("perfume banner brand")
    .skip(skip)
    .limit(limit)
    .lean()
    .populate("brand", "brand _id");

  res.status(200).json({ totalPage, totalDocuments, perfumes });
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const isValidId = await brand.findByIdAndDelete(req?.params?.id);
  const data = await brand.find();
  if (!isValidId) {
    return res
      .status(400)
      .json({ status: true, message: "No data found with given id!!" });
  }
  res.status(200).json({ status: true, message: "Deleted Successfully!!" });
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const isValidId = await brand.findByIdAndUpdate(req?.params?.id, req?.body);
  const data = await brand.find();
  if (!isValidId) {
    return res
      .status(400)
      .json({ status: true, message: "brand updated successfully!!" });
  }
  res.status(200).json({
    status: true,
    data,
    message: "updated sucessfully!! Successfully!!",
  });
});
