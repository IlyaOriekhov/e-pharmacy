import { Router } from "express";
import {
  getCart,
  addItemToCart,
  updateCart,
  removeItemFromCart,
  clearUserCart,
  checkoutCart,
} from "../controllers/cart.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  addToCartSchema,
  updateCartSchema,
  removeFromCartSchema,
  checkoutSchema,
} from "../validation/cart.js";

const cartRouter = Router();

cartRouter.use(authenticate);

cartRouter.get("/", getCart);
cartRouter.post("/add", validateBody(addToCartSchema), addItemToCart);
cartRouter.put("/update", validateBody(updateCartSchema), updateCart);
cartRouter.delete(
  "/remove",
  validateBody(removeFromCartSchema),
  removeItemFromCart
);
cartRouter.delete("/clear", clearUserCart);
cartRouter.post("/checkout", validateBody(checkoutSchema), checkoutCart);

export default cartRouter;
