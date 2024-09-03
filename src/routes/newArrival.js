import express from "express";
import { upload } from "../config/cloudinary.js";
import { createNewArrivalPerfume, deleteAllNewArrivalPerfume, getAllNewArrivalPerfume, getAllNewArrivalPerfumeById } from "../controllers/newArrival.js";

const router = express.Router();


router
  .route("/")
  .post(
    upload.fields([{ name: "gallery" }, { name: "banner" }, { name: "logo" }]),
    createNewArrivalPerfume
  )
  .get(getAllNewArrivalPerfume);

router.route("/:id").delete(deleteAllNewArrivalPerfume).get(getAllNewArrivalPerfumeById);



export const newArrivalRouter = router;