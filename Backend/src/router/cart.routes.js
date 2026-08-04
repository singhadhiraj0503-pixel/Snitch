import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  validateAddToCart,
  validateDecrementCartItemQuantity,
  validateIncrementCartItemQuantity,
  validateRemoveCartItem,
} from "../validators/cart.validator.js";
import {
  addToCart,
  createOrderController,
  decrementCartItemQuantity,
  getCart,
  getOrderDetails,
  incrementCartItemQuantity,
  removeCartItem,
  verifyOrderController,
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

cartRouter.delete(
  "/remove/:productId/:variantId",
  authenticateUser,
  validateRemoveCartItem,
  removeCartItem,
);

cartRouter.post(
  "/payment/create/order",
  authenticateUser,
  createOrderController,
);

cartRouter.post(
  "/payment/verify/order",
  authenticateUser,
  verifyOrderController,
);

cartRouter.get("/order/:orderId", authenticateUser, getOrderDetails);

export default cartRouter;
