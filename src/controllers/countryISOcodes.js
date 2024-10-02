// @desc    Get all country ISO codes
// @route   GET /api/countries

import { countryISOcodesModel } from "../models/countryCodes.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @access  Public
export const getCountries = asyncHandler(async (req, res) => {
  const countries = await countryISOcodesModel.find({});
  res.status(200).json(countries);
});

// @desc    Create a new country ISO code
// @route   POST /api/countries
// @access  Public
export const createCountry = asyncHandler(async (req, res) => {
  const { countryISOcodes } = req.body;

  console.log("asdfdsafdsa", countryISOcodes);
  const countryCodes = await countryISOcodesModel.insertMany(countryISOcodes);
  console.log("aasf", countryCodes);
  res.status(201).json(countryCodes);
});

// @desc    Update a country ISO code
// @route   PUT /api/countries/:id
// @access  Public
export const updateCountry = asyncHandler(async (req, res, next) => {
  const { payload } = req.body;

  const country = await countryISOcodesModel.findOne(
    { accessTo: "admin" },
    {
      countryISOcodes: { $push: payload },
    }
  );

  if (!country) {
    res.status(404);
    throw new Error("Country not found");
  }

  //   country.countryISOcodes[0].value = value || country.countryISOcodes[0].value;
  //   country.countryISOcodes[0].label = label || country.countryISOcodes[0].label;

  const updatedCountry = await country.save();
  res.status(200).json({
    status: true,
    message: "Fetched Data Successfully",
    updatedCountry,
  });
});

// @desc    Delete a country ISO code
// @route   DELETE /api/countries/:id
// @access  Public
export const deleteCountry = asyncHandler(async (req, res) => {
  const country = await countryISOcodesModel.findById(req.params.id);

  if (!country) {
    res.status(404);
    throw new Error("Country not found");
  }

  await country.remove();
  res.status(204).json({ message: "Country removed" });
});
