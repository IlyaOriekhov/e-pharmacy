import { Router } from "express";
import { getReviews } from "../controllers/reviews.js";

const reviewsRouter = Router();

reviewsRouter.get("/customer-reviews", getReviews);

export default reviewsRouter;
