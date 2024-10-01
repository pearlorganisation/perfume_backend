import { asyncHandler } from "../utils/asyncHandler.js";
import newsModel from "../models/news.js";
import errorResponse from "../utils/errorResponse.js";

export const newNews = asyncHandler(async (req, res, next) => {
  console.log("sadfsadfas", req.body);

  const newDoc = new newsModel({ ...req?.body, image: req?.file?.path });
  await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "created successfully!!", newDoc });
});

export const getAllNews = asyncHandler(async (req, res, next) => {
  const data = await newsModel.find();
  res.status(200).json({ status: true, data });
});
export const getAllNewsAdmin = asyncHandler(async (req, res, next) => {
  const {Page,Limit,Search} = req.query;
  
  let page = 1;
  let limit = 10;
  let search = '';

  if(Page)
  {
    page = Math.max(page,Page);
  }
  if(Limit)
  {
    limit = Math.max(limit,Limit);
  }
  if(Search)
  {
    search = Search;
  }

  let skip = (page-1)*limit;

   const totalDocuments = await newsModel.countDocuments({ title: { $regex: search, $options: 'i' } });
   const totalPage = Math.ceil(totalDocuments / limit);
  const data = await newsModel.find({ title: { $regex: search, $options: 'i' } }).skip(skip).limit(limit).lean();
  res.status(200).json({ status: true, data,totalPage,totalDocuments });
});

export const deleteNews = asyncHandler(async (req, res, next) => {
  const deletedData = await newsModel.findByIdAndDelete(req?.params?.id);
  if (!deletedData) {
    return next(new errorResponse("No data found with given id!! "));
  }
  res
    .status(200)
    .json({ status: true, mesasge: "News deleted successfully!!" });
});

export const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing id" });
  }

  const payload = {
    title: req.body.title,
    content: req.body.content,
  };

  const { banner } = req?.files;

  if (banner && banner?.length > 0) {
    payload.banner = banner[0]?.path;
  }

  await newsModel.findOneAndUpdate({ _id: req.body.id }, payload);
  res.status(200).json({ status: true, message: "Blog Updated successfully" });
});
