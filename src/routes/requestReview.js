import express from "express";
import { updateStatus, createRequestReview, deleteRequestReview, getAllRequestReviews, getRequestReviewById, updateRequestReview } from "../controllers/requestReview.js";


const router = express.Router();

router.patch('/status/:id',updateStatus);
router.post('/', createRequestReview);
router.get('/', getAllRequestReviews);
router.get('/:id', getRequestReviewById);
router.put('/:id', updateRequestReview);
router.delete('/:id', deleteRequestReview);

export const requestReviewRouter =  router;
