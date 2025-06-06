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

    const workingPhotosFromDB = [
      "https://i.ibb.co/X330FTj/shop-4-10-1000x1000-min.jpg",
      "https://i.ibb.co/GxTVSVk/shop-4-9-1000x1000-min.jpg",
      "https://i.ibb.co/02WmJdc/5-19-1000x1000-min.jpg",
      "https://i.ibb.co/Hg0zZkQ/shop-4-7-1000x1000-min.jpg",
      "https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg",
    ];

    const brokenUrls = [
      "https://i.ibb.co/Kx4ZpXX/shop-4-12-1000x1000-min.jpg",
      "https://i.ibb.co/QnKsBpX/shop-4-13-1000x1000-min.jpg",
      "https://i.ibb.co/v1SBN2k/shop-4-14-1000x1000-min.jpg",
      "https://i.ibb.co/d4jtXf1/shop-4-15-1000x1000-min.jpg",
      "https://i.ibb.co/MkY67F3/shop-4-16-1000x1000-min.jpg",
      "https://i.ibb.co/j6N2qYv/shop-4-17-1000x1000-min.jpg",
      "https://i.ibb.co/qDRjRmb/shop-4-18-1000x1000-min.jpg",
      "https://i.ibb.co/vHPcGGf/shop-4-19-1000x1000-min.jpg",
      "https://i.ibb.co/8XnDS2r/shop-4-20-1000x1000-min.jpg",
      "https://i.ibb.co/F5j8sxD/shop-4-21-1000x1000-min.jpg",
      "https://i.ibb.co/ZBrK3RJ/shop-4-22-1000x1000-min.jpg",
      "https://i.ibb.co/zHrD8H7/shop-4-23-1000x1000-min.jpg",
      "https://i.ibb.co/SN1GqNZ/shop-4-24-1000x1000-min.jpg",
      "https://i.ibb.co/zGt8tYX/shop-4-25-1000x1000-min.jpg",
      "https://i.ibb.co/2sbbn4B/shop-4-26-1000x1000-min.jpg",
      "https://i.ibb.co/jf9ymcx/shop-4-27-1000x1000-min.jpg",
      "https://i.ibb.co/ZfP2FD0/shop-4-11-1000x1000-min.jpg",
      "https://i.ibb.co/jL1tKKp/shop-4-28-1000x1000-min.jpg",
      "https://i.ibb.co/N2nKzWw/shop-4-29-1000x1000-min.jpg",
      "https://i.ibb.co/q10bYmN/shop-4-30-1000x1000-min.jpg",
      "https://i.ibb.co/M9wL6qY/shop-4-32-1000x1000-min.jpg",
      "https://i.ibb.co/g4fRXm7/shop-4-33-1000x1000-min.jpg",
      "https://i.ibb.co/GdWJxG1/shop-4-34-1000x1000-min.jpg",
      "https://i.ibb.co/bLL4sWJ/shop-4-35-1000x1000-min.jpg",
      "https://i.ibb.co/cFtQwGV/shop-4-31-1000x1000-min.jpg",
    ];

    const processedProducts = products.map((product, index) => {
      let photo = product.photo;

      if (brokenUrls.includes(photo)) {
        photo = workingPhotosFromDB[index % workingPhotosFromDB.length];
      }

      return {
        ...product,
        photo: photo,
        stock: parseInt(product.stock) || 0,
        price: parseFloat(product.price) || 0,
      };
    });

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
