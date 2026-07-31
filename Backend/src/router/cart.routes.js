import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  validateAddToCart,
  validateDecrementCartItemQuantity,
  validateIncrementCartItemQuantity,
} from "../validators/cart.validator.js";
import {
  addToCart,
  decrementCartItemQuantity,
  getCart,
  incrementCartItemQuantity,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post(
  "/add/:productId/:variantId",
  authenticateUser,
  validateAddToCart,
  addToCart,
);

cartRouter.get("/", authenticateUser, getCart);

cartRouter.patch(
  "/quantity/increment/:productId/:variantId",
  authenticateUser,
  validateIncrementCartItemQuantity,
  incrementCartItemQuantity,
);

cartRouter.patch(
  "/quantity/decrement/:productId/:variantId",
  authenticateUser,
  validateDecrementCartItemQuantity,
  decrementCartItemQuantity,
);

export default cartRouter;
