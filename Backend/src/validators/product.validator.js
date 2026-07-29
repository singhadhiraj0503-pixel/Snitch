import { body, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Error", error: error.array() });
  }

  next();
};

export const createProductValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
  body("priceCurrency").notEmpty().withMessage("Price currency is required"),

  validateRequest,
];

export const addVariantValidator = [
  body("priceAmount").isNumeric().withMessage("Price amount must be a number"),

  body("stock").isNumeric().withMessage("Stock must be a number"),

  body("attributes").notEmpty().withMessage("Attributes are required"),

  validateRequest,
];
