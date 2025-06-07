import { createAsyncThunk } from "@reduxjs/toolkit";
import instance, { setToken } from "../instance";
import { toast } from "react-toastify";

export const getSearchProducts = createAsyncThunk("products", async (body) => {
  try {
    const {
      category = "",
      name = "",
      search = "",
      page = 1,
      limit = 12,
    } = body;

    const validPage = Math.max(1, parseInt(page) || 1);
    const validLimit = Math.max(1, parseInt(limit) || 12);

    const searchTerm = name || search || "";

    const searchParams = new URLSearchParams();

    if (category && category.trim() !== "") {
      searchParams.set("category", category.trim());
    }

    if (searchTerm && searchTerm.trim() !== "") {
      searchParams.set("search", searchTerm.trim());
    }

    searchParams.set("page", validPage.toString());
    searchParams.set("limit", validLimit.toString());

    const url = `/products?${searchParams.toString()}`;

    const response = await instance.get(url);

    const responseData = response.data.data || {};
    const products = responseData.products || [];
    const pagination = responseData.pagination || {};

    const result = {
      products: products,
      currentPage: pagination.page || validPage,
      totalPages: pagination.totalPages || 1,
      totalProducts: pagination.total || products.length,
    };

    return result;
  } catch (error) {
    console.error("❌ Search error:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return {
      products: [],
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,
    };
  }
});

export const getCustomerReviews = createAsyncThunk("reviews", async (body) => {
  try {
    const { limit = 3 } = body;
    const response = await instance.get(`/customer-reviews?limit=${limit}`);

    return (
      response.data.data.reviews || response.data.data || response.data || []
    );
  } catch (error) {
    console.warn("getCustomerReviews failed:", error.message);
    return [];
  }
});

export const getNearestStores = createAsyncThunk(
  "nearest-stores",
  async (body) => {
    try {
      const { limit = 6 } = body;
      const response = await instance.get(`/stores/nearest?limit=${limit}`);

      return (
        response.data.data.stores || response.data.data || response.data || []
      );
    } catch (error) {
      console.warn("getNearestStores failed:", error.message);
      return [];
    }
  }
);

export const getAllStores = createAsyncThunk("all-stores", async (body) => {
  try {
    const { limit = "" } = body;
    const response = await instance.get(`/stores?limit=${limit}`);

    return (
      response.data.data.stores || response.data.data || response.data || []
    );
  } catch (error) {
    console.warn("getAllStores failed:", error.message);
    return [];
  }
});

export const getProductById = createAsyncThunk(
  "products/:id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/products/${id}`);

      const productData = response.data.data.product;

      const productWithDescription = {
        ...productData,
        description: productData.description || {
          text: "Although it's typically considered safe, excessive consumption can lead to side effects. Therefore, it's recommended to consult a healthcare professional before using this product, especially if you're pregnant, nursing, or taking other medications. This balanced approach allows for the benefits while recognizing the importance of proper usage and caution.",
          medicinal_uses:
            "This product is packed with antioxidants that help fight oxidative stress and inflammation in the body.",
          anti_diabetic_effects:
            "Some studies have shown that this product might lower blood sugar levels, making it a valuable supplement for managing diabetes.",
          heart_health:
            "The plant has been linked to reduced cholesterol levels, which is vital for heart health.",
          anti_cancer_properties:
            "Certain compounds in this product, such as niazimicin, have been found to suppress the growth of cancer cells in laboratory studies.",
          immune_support:
            "With its high vitamin C content, this product can boost the immune system.",
          digestive_aid:
            "This product can help in treating digestive disorders due to its anti-inflammatory properties.",
        },
      };

      return productWithDescription;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart-items",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue("No authentication token");
      }

      setToken(token);
      const response = await instance.get("/cart");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart-add",
  async (body, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue("No authentication token");
      }

      setToken(token);
      const response = await instance.post("/cart/add", body);

      toast.success("Product added to cart");
      return response.data;
    } catch (error) {
      toast.error("Failed to add product to cart");
      return rejectWithValue(error.message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart-update",
  async (body, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue("No authentication token");
      }

      setToken(token);
      const response = await instance.put("/cart/update", body);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart-remove",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue("No authentication token");
      }

      setToken(token);
      const response = await instance.delete("/cart/remove", {
        data: { productId },
      });

      toast.success("Product removed from cart");
      return response.data;
    } catch (error) {
      toast.error("Failed to remove product from cart");
      return rejectWithValue(error.message);
    }
  }
);

export const cartCheckout = createAsyncThunk(
  "cart-checkout",
  async (body, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue("No authentication token");
      }

      setToken(token);

      const checkoutData = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        paymentMethod: body.paymentMethod,
      };

      await instance.post("/cart/checkout", checkoutData);

      toast.success("The order is successful. Wait for a call to confirm.");

      return {
        data: {
          items: [],
          totalAmount: 0,
          totalItems: 0,
        },
      };
    } catch (error) {
      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message || "Validation error";
        toast.error(`Order failed: ${errorMessage}`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
