import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  getCategories,
  searchProductsController,
} from "../controllers/products.js";
import { isValidId } from "../middlewares/isValidId.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/search", searchProductsController);
productsRouter.get("/categories", getCategories);
productsRouter.get("/:id", isValidId, getProduct);

export default productsRouter;
