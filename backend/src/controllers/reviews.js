import createHttpError from "http-errors";
import { getCustomerReviews } from "../services/reviews.js";

export const getReviews = async (req, res) => {
  try {
    const { limit } = req.query;
    const reviews = await getCustomerReviews(limit);

    res.status(200).json({
      status: 200,
      message: "Customer reviews retrieved successfully",
      data: {
        reviews,
      },
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(500, "Failed to get customer reviews");
  }
};
