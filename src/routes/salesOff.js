import express from "express";
import { createSalesOff, deleteSalesOff, getSalesOffById, getSalesOffs, updateSalesOff } from "../controllers/salesOff.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.route('/')
.get(getSalesOffs)
.post(upload.single('banner'),createSalesOff);

router.route("/:id")
.get(getSalesOffById)
.patch(upload.single('banner'),updateSalesOff)
.delete(deleteSalesOff);


export const salesOffRouter = router;