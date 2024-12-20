import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  getAllReview,
  getReviewByUserId,
  newPerfumeReview,
} from "../controllers/review.js";
import { checkIfReviewExists } from "../middlewares/checkIfReviewExists.js";
const router = express.Router();

router.route("/").post(upload.array("commentGallery"),checkIfReviewExists,newPerfumeReview);
router.route("/:id").get(getAllReview);
router.route("/user/:id").get(getReviewByUserId);
export const reviewRouter = router;
