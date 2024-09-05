import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  createOtherRelatedPerfume,
  getAllOtherRelatedPerfumes,
} from "../controllers/otherRelatedPerfume.js";
const router = express.Router();

router
  .route("/brand/:id")
  .post(upload.single("image"), createOtherRelatedPerfume)
  .get(getAllOtherRelatedPerfumes);

// router.route("/").get(getAllOtherRelatedPerfumes);

// router.route("/:id").delete(deleteNote);

export const relatedPerfumeRouter = router;
