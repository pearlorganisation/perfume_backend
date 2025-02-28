import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  addCelebrityPerfume,
  deleteCelebrityPerfume,
  getCelebrityPerfume,
  getCelebrityPerfumeAdmin,
  getCelebrityPerfumes,
  updateCelebrityPerfume,
} from "../controllers/celebrityPerfumes.js";

const router = express.Router();

router.route('/admin').get(getCelebrityPerfumeAdmin);

router
  .route("/")
  .post(upload.fields([{ name: "banner" }]), addCelebrityPerfume)
  .get(getCelebrityPerfumes);

router
  .route("/:id")
  .delete(deleteCelebrityPerfume)
  .get(getCelebrityPerfume)
  .patch(upload.fields([{ name: "banner" }]), updateCelebrityPerfume);

export default router;
