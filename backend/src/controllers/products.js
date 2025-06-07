import createHttpError from "http-errors";
import {
  getProducts,
  getProductById,
  getProductCategories,
  searchProducts,
} from "../services/products.js";
import { getCustomerReviews } from "../services/reviews.js";

export const getAllProducts = async (req, res) => {
  try {
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      category: req.query.category,
      search: req.query.search,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    };

    const result = await getProducts(filters);

    if (result.products.length === 0 && req.query.search) {
      return res.status(200).json({
        status: 200,
        message: "Nothing was found for your request",
        data: {
          products: [],
          pagination: result.pagination,
        },
      });
    }

    res.status(200).json({
      status: 200,
      message: "Products retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(500, "Failed to get products");
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    const reviews = await getCustomerReviews(3);

    const productWithReviews = {
      ...product,
      reviews: reviews,
    };

    const response = {
      status: 200,
      message: "Product retrieved successfully",
      data: {
        product: productWithReviews,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    if (error.message === "Product not found") {
      throw createHttpError(404, error.message);
    }
    throw createHttpError(500, "Failed to get product");
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getProductCategories();

    res.status(200).json({
      status: 200,
      message: "Categories retrieved successfully",
      data: {
        categories,
      },
    });
  } catch (error) {
    console.error(error);

    throw createHttpError(500, "Failed to get categories");
  }
};

export const searchProductsController = async (req, res) => {
  try {
    const { q: searchTerm, limit } = req.query;

    if (!searchTerm) {
      throw createHttpError(400, "Search term is required");
    }

    const products = await searchProducts(searchTerm, limit);

    res.status(200).json({
      status: 200,
      message: "Search completed successfully",
      data: {
        products,
        searchTerm,
      },
    });
  } catch (error) {
    if (error.status === 400) {
      throw error;
    }
    throw createHttpError(500, "Failed to search products");
  }
};
