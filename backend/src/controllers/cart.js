import createHttpError from "http-errors";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  checkout,
} from "../services/cart.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartData = await getCartItems(userId);

    const response = {
      status: 200,
      message: "Cart items retrieved successfully",
      data: cartData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Backend getCart error:", error);
    if (error.message === "User not found") {
      throw createHttpError(404, error.message);
    }
    throw createHttpError(500, "Failed to get cart items");
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;

    const cartData = await addToCart(userId, productId, Number(quantity));

    const response = {
      status: 200,
      message: "Item added to cart successfully",
      data: cartData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Backend addToCart error:", error);
    if (
      error.message.includes("not found") ||
      error.message.includes("stock")
    ) {
      throw createHttpError(400, error.message);
    }
    throw createHttpError(500, "Failed to add item to cart");
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cartData = await updateCartItem(userId, productId, Number(quantity));

    res.status(200).json({
      status: 200,
      message: "Cart updated successfully",
      data: cartData,
    });
  } catch (error) {
    if (
      error.message.includes("not found") ||
      error.message.includes("stock")
    ) {
      throw createHttpError(400, error.message);
    }
    throw createHttpError(500, "Failed to update cart");
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const cartData = await removeFromCart(userId, productId);

    res.status(200).json({
      status: 200,
      message: "Item removed from cart successfully",
      data: cartData,
    });
  } catch (error) {
    if (error.message === "User not found") {
      throw createHttpError(404, error.message);
    }
    throw createHttpError(500, "Failed to remove item from cart");
  }
};

export const clearUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await clearCart(userId);

    res.status(200).json({
      status: 200,
      message: result.message,
    });
  } catch (error) {
    if (error.message === "User not found") {
      throw createHttpError(404, error.message);
    }
    throw createHttpError(500, "Failed to clear cart");
  }
};

export const checkoutCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderData = req.body;

    const order = await checkout(userId, orderData);

    res.status(201).json({
      status: 201,
      message: "Order placed successfully",
      data: {
        order: {
          id: order._id,
          orderDate: order.orderDate,
          total: order.total,
          status: order.status,
          paymentMethod: order.paymentMethod,
        },
      },
    });
  } catch (error) {
    if (
      error.message.includes("Cart is empty") ||
      error.message.includes("Insufficient stock") ||
      error.message === "User not found"
    ) {
      throw createHttpError(400, error.message);
    }
    throw createHttpError(500, "Failed to place order");
  }
};
