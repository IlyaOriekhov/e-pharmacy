import createHttpError from "http-errors";
import {
  getNearestStores,
  getAllStores,
  getStoreById,
  getStoreCities,
} from "../services/stores.js";

// Отримання найближчих магазинів
export const getNearestPharmacies = async (req, res) => {
  try {
    const { limit } = req.query;
    const stores = await getNearestStores(limit);

    res.status(200).json({
      status: 200,
      message: "Nearest pharmacies retrieved successfully",
      data: {
        stores,
      },
    });
  } catch (error) {
    console.error(error);

    throw createHttpError(500, "Failed to get nearest pharmacies");
  }
};

// Отримання всіх магазинів
export const getStores = async (req, res) => {
  try {
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      city: req.query.city,
      status: req.query.status,
      minRating: req.query.minRating,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    };

    const result = await getAllStores(filters);

    res.status(200).json({
      status: 200,
      message: "Stores retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    throw createHttpError(500, "Failed to get stores");
  }
};

// Отримання магазину за ID
export const getStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await getStoreById(id);

    res.status(200).json({
      status: 200,
      message: "Store retrieved successfully",
      data: {
        store,
      },
    });
  } catch (error) {
    if (error.message === "Store not found") {
      throw createHttpError(404, error.message);
    }
    throw createHttpError(500, "Failed to get store");
  }
};

// Отримання міст
export const getCities = async (req, res) => {
  try {
    const cities = await getStoreCities();

    res.status(200).json({
      status: 200,
      message: "Cities retrieved successfully",
      data: {
        cities,
      },
    });
  } catch (error) {
    console.error(error);

    throw createHttpError(500, "Failed to get cities");
  }
};
