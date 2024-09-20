import express from "express";
import { upload } from "../config/cloudinary.js";
import { upload2 } from "../config/multer2.js";
import {
  deletePerfume,
  getAllPerfume,
  getSinglePerfume,
  newPerfume,
  updatePerfume,
} from "../controllers/perfume.js";
import { getAllRecentPerfume } from "../controllers/recentPerfumes.js";

const router = express.Router();

router.route("/recent").get(getAllRecentPerfume);

router
  .route("/")
  .post(
    upload.fields([
      { name: "gallery" },
      { name: "banner" },
      { name: "logo" },
      { name: "video" },
    ]),
    newPerfume
  )
  .get(getAllPerfume);

router
  .route("/:id")
  .delete(deletePerfume)
  .get(getSinglePerfume)
  .patch(
    upload2.fields([
      { name: "gallery" },
      { name: "banner" },
      { name: "logo" },
      { name: "video" },
    ]),
    updatePerfume
  );

export default router;
