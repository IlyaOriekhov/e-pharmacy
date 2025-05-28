import { Pharmacy, NearestPharmacy } from "../db/models/Store.js";

export const getNearestStores = async (limit = 6) => {
  let stores = await NearestPharmacy.find().limit(Number(limit)).lean();

  if (stores.length === 0) {
    stores = await Pharmacy.find({ isNearest: true })
      .limit(Number(limit))
      .lean();
  }

  if (stores.length === 0) {
    stores = await Pharmacy.aggregate([{ $sample: { size: Number(limit) } }]);
  }

  return stores;
};

export const getAllStores = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    city,
    status,
    minRating,
    sortBy = "rating",
    sortOrder = "desc",
  } = filters;

  const filter = {};

  if (city) {
    filter.city = { $regex: city, $options: "i" };
  }

  if (status) {
    filter.status = status;
  }

  if (minRating) {
    filter.rating = { $gte: Number(minRating) };
  }

  const sort = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  const [stores, total] = await Promise.all([
    Pharmacy.find(filter).sort(sort).skip(skip).limit(Number(limit)).lean(),
    Pharmacy.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    stores,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const getStoreById = async (storeId) => {
  const store = await Pharmacy.findById(storeId).lean();

  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

export const getStoreCities = async () => {
  const cities = await Pharmacy.distinct("city");
  return cities;
};
