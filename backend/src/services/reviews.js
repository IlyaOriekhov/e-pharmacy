import { Review } from "../db/models/Review.js";

export const getCustomerReviews = async (limit = 10) => {
  const reviews = await Review.find()
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .lean();

  return reviews;
};
