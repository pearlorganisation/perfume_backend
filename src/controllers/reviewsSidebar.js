import { reviewsSidebarModel } from "../models/reviewsSidebar.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const addReviewSidebar = asyncHandler(async (req, res, next) => {
    const { title, reviewBy, description, perfumeId } = req?.body;

    const {banner} = req?.files

    if (!title && !banner && !reviewBy && !description && !perfumeId) {
        res.status(500).json({ status: false, message: "Incomplete data" })
    }
    

    const payload = { title, banner: banner[0]?.path, reviewBy, description, perfumeId }

    console.log(payload)

    await reviewsSidebarModel.create(payload)

    const result = await reviewsSidebarModel.find({})

    res.status(200).json({ status: true, message: 'Perfume Review Added', data: result });
});

export const getReviewsSidebar = asyncHandler(async (req, res, next) => {
    console.log('findingnnn')
    const reviewsSidebarData = await reviewsSidebarModel.find({}).sort({ createdAt: -1 }).limit(21);

    res.status(200).json({ status: true, data: reviewsSidebarData });
});

export const deleteReviewsSidebar = asyncHandler(async (req, res, next) => {
    const isValidId = await reviewsSidebarModel.findByIdAndDelete(req?.params?.id);
    if (!isValidId) {
        return res
            .status(400)
            .json({ status: true, message: "No data found with given id!!" });
    }

    res.status(200).json({
        status: true,
        message: "Deleted successfully!!",
    });
});

export const getSingleReviewSidebar = asyncHandler(async (req, res, next) => {
    const data = await reviewsSidebarModel
        .findById(req?.params?.id);
    if (!data) {
        return res.status(400).json({
            status: false,
            message: "No data found with given id!!",
        });
    }

    res.status(200).json({ status: true, data });
});




export const getAllReviewsSidebar = asyncHandler(async (req, res, next) => {
    //  need to paginate this later =>

    const data = await reviewsSidebarModel.find().sort({ createdAt: -1 })

    res.status(200).json({ status: true, data });
});
