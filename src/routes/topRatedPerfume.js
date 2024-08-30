import express from "express";
import { createTopRatedPerfume, deleteTopRatedPerfume, getAllTopRatedPerfumes, getTopRatedPerfumeById } from "../controllers/topRatedPerfume.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();


router
  .route("/")
  .post(
    upload.fields([{ name: "gallery" }, { name: "banner" }, { name: "logo" }]),
    createTopRatedPerfume
  )
  .get(getAllTopRatedPerfumes);

router.route("/:id").delete(deleteTopRatedPerfume).get(getTopRatedPerfumeById);



export const topRatedPerfumeRouter = router;