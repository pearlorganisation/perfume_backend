import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  deletePerfume,
  getAllPerfume,
  getSinglePerfume,
  newPerfume,
} from "../controllers/perfume.js";

const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([{ name: "gallery" }, { name: "banner" }, { name: "logo" }]),
    newPerfume
  )
  .get(getAllPerfume);

router.route("/:id").delete(deletePerfume).get(getSinglePerfume);

export default router;
