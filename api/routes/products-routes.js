const express = require("express");
const productsRouter = express.Router();
const productController = require("../controller/products-controller");
const auth = require("../middleware/auth-middleware");
const upload = require("../service/image-service");

productsRouter.post(
  "/create-product",
  auth,
  upload.single("image"),
  productController.createProduct
);
productsRouter.put(
  "/update-product/:id",
  auth,
  upload.single("image"),
  productController.updateProduct
);
productsRouter.get("/get-product", auth, productController.getProducts);
productsRouter.get(
  "/get-product-by-id/:id",
  auth,
  productController.getProductById
);
productsRouter.delete(
  "/delete-product/:id",
  auth,
  productController.deleteProduct
);

module.exports = productsRouter;
