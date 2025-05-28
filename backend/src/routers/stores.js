import { Router } from "express";
import {
  getNearestPharmacies,
  getStores,
  getStore,
  getCities,
} from "../controllers/stores.js";
import { isValidId } from "../middlewares/isValidId.js";

const storesRouter = Router();

storesRouter.get("/nearest", getNearestPharmacies);
storesRouter.get("/cities", getCities);
storesRouter.get("/", getStores);
storesRouter.get("/:id", isValidId, getStore);

export default storesRouter;
