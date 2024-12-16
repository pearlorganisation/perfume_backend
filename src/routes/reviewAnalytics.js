import express from "express";
import { getReviewAnalytics, getReviewAnalyticsById } from "../controllers/reviewAnalytics.js";


const router =  express.Router();


router.route('/')
.get(getReviewAnalytics)

router.route('/:productId')
.get(getReviewAnalyticsById)


export const reviewAnalyticsRouter = router;