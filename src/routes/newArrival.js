import express from "express";
import { upload } from "../config/cloudinary.js";
import { addNewArrival, deleteNewArrival, getAllNewArrival, getNewArrival } from "../controllers/newArrival.js";

const router = express.Router();


router
  .route("/")
  .post(
    upload.fields([{ name: "banner" }]),
    addNewArrival
  )
  .get(getNewArrival);

router.route("/:id").delete(deleteNewArrival).get(getAllNewArrival);



export const newArrivalRouter = router;