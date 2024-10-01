import express from "express";
import { approveRequestReview, createRequestReview, deleteRequestReview, getAllRequestReviews, getRequestReviewById, updateRequestReview } from "../controllers/requestReview.js";
import { upload } from "../config/cloudinary.js";


const router = express.Router();

router.patch('/status/:id',approveRequestReview);
router.post('/',upload.array('images'), createRequestReview);
router.get('/', getAllRequestReviews);
router.get('/:id', getRequestReviewById);
router.put('/:id', updateRequestReview);
router.delete('/:id', deleteRequestReview);

export const requestReviewRouter =  router;
