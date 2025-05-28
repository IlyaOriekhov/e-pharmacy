import { Product } from "../db/models/Product.js";

export const getProducts = async (filters = {}) => {
  const {
    page = 1,
    limit = 12,
    category,
    search,
    sortBy = "_id",
    sortOrder = "desc",
  } = filters;

  const filter = {};

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { suppliers: { $regex: search, $options: "i" } },
    ];
  }

  const sort = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)).lean(),
      Product.countDocuments(filter),
    ]);

    const processedProducts = products.map((product) => ({
      ...product,
      stock: parseInt(product.stock) || 0,
      price: parseFloat(product.price) || 0,
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      products: processedProducts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId).lean();

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      ...product,
      stock: parseInt(product.stock) || 0,
      price: parseFloat(product.price) || 0,
    };
  } catch (error) {
    console.error("Error in getProductById:", error);
    throw error;
  }
};

export const getProductCategories = async () => {
  try {
    const categories = await Product.distinct("category");
    return categories.filter((cat) => cat);
  } catch (error) {
    console.error("Error in getProductCategories:", error);
    throw error;
  }
};

export const searchProducts = async (searchTerm, limit = 10) => {
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .limit(Number(limit))
      .lean();

    return products.map((product) => ({
      ...product,
      stock: parseInt(product.stock) || 0,
      price: parseFloat(product.price) || 0,
    }));
  } catch (error) {
    console.error("Error in searchProducts:", error);
    throw error;
  }
};
