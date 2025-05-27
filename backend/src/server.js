import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./utils/env.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

import authRouter from "./routers/auth.js";
import storesRouter from "./routers/stores.js";
import productsRouter from "./routers/products.js";
import reviewsRouter from "./routers/reviews.js";
import cartRouter from "./routers/cart.js";

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(logger);

  app.use("/api/user", authRouter);
  app.use("/api/stores", storesRouter);
  app.use("/api/products", productsRouter);
  app.use("/api", reviewsRouter);
  app.use("/api/cart", cartRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(env("PORT", 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
