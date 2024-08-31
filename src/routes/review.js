import express from "express";
import { upload } from "../config/cloudinary.js";
import { getAllReview, newPerfumeReview } from "../controllers/review.js";
const router = express.Router();

router
  .route("/")
  .post(upload.array("commentGallery"), newPerfumeReview);
router.route("/:id")
.get(getAllReview);
;

export const reviewRouter = router;
