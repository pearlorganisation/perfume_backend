import express from "express";
import { upload } from "../config/cloudinary.js";
import { addFragram, deleteFragram, getFragrams, getSingleFragram, updateFragram } from "../controllers/fragrams.js";


const fragramsRouter = express.Router();

fragramsRouter.route("/").get(getFragrams).post(upload.fields([{ name: "banner" }]),addFragram)
  
fragramsRouter.route("/single/:id").get(getSingleFragram).patch(upload.fields([{ name: "banner" }]), updateFragram).delete(deleteFragram)


export default fragramsRouter;