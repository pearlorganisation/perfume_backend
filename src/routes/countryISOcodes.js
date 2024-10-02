import express from "express";
import {
  createCountry,
  deleteCountry,
  getCountries,
  updateCountry,
} from "../controllers/countryISOcodes.js";

const router = express.Router();

router.route("/").get(getCountries).post(createCountry);
router.route("/:id").put(updateCountry).delete(deleteCountry);

export const countryIsoCodes = router;
