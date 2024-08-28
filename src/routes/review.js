import express from "express";
import { upload } from "../config/cloudinary.js";
import { newPerfumeReview, singleReview } from "../controllers/review.js";
const router = express.Router();

router
  .route("/")
  .get(singleReview)
  .post(upload.array("reviewGallery"), newPerfumeReview);
router.route("/:id").get(singleReview);

export default router;
