import express from "express";
import {
  deleteBrand,
  getAllBrands,
  newBrand,
  updateBrand,
} from "../controllers/brand.js";
const router = express.Router();

router.route("/").get(getAllBrands).post(newBrand);
router.route("/:id").delete(deleteBrand).patch(updateBrand);
export default router;
