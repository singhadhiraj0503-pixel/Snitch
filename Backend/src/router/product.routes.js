import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {
  addProductVariant,
  createProduct,
  getAllProducts,
  getProductDetails,
  getSellerProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import multer from "multer";
import {
  addVariantValidator,
  createProductValidator,
} from "../validators/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const productRouter = new Router();

productRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  createProductValidator,
  createProduct,
);

productRouter.get("/seller", authenticateSeller, getSellerProducts);

productRouter.get("/", getAllProducts);

productRouter.get("/details/:id", getProductDetails);

productRouter.post(
  "/:productId/variants",
  authenticateSeller,
  upload.array("images", 7),
  addVariantValidator,
  addProductVariant,
);

// productRouter.patch("/update/:productId", authenticateSeller, updateProduct);

export default productRouter;
