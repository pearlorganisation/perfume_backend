import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  deletePerfume,
  getAllPerfume,
  newPerfume,
} from "../controllers/perfume.js";
const router = express.Router();

router
  .route("/")
  .post(upload.fields([{ name: "gallery" }, { name: "banner" }]), newPerfume)
  .get(getAllPerfume);

router.route("/:id").delete(deletePerfume);

export default router;
