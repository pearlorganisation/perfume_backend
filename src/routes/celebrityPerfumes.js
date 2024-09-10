import express from "express";
import { upload } from "../config/cloudinary.js";
import { addCelebrityPerfume, deleteCelebrityPerfume, getCelebrityPerfume, getCelebrityPerfumes, updateCelebrityPerfume } from "../controllers/celebrityPerfumes.js";


const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([{ name: "banner" }]),
    addCelebrityPerfume
  )
  .get(getCelebrityPerfumes)
  .patch(upload.fields([{ name: "banner" }]) , updateCelebrityPerfume);

router.route("/:id").delete(deleteCelebrityPerfume).get(getCelebrityPerfume);

export default router;
