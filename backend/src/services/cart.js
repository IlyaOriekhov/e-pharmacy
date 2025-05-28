import { User } from "../db/models/User.js";
import { Product } from "../db/models/Product.js";
import { Order } from "../db/models/Order.js";

export const getCartItems = async (userId) => {
  const user = await User.findById(userId)
    .populate("cart.product", "name price photo stock category suppliers")
    .lean();

  if (!user) {
    throw new Error("User not found");
  }

  const validCartItems =
    user.cart?.filter((item) => {
      if (!item.product) return false;
      const stock = parseInt(item.product.stock) || 0;
      return stock > 0;
    }) || [];

  const totalAmount = validCartItems.reduce((sum, item) => {
    const price = parseFloat(item.product.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  return {
    items: validCartItems,
    totalItems: validCartItems.length,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  };
};

export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const stock = parseInt(product.stock) || 0;
    if (stock < quantity) {
      throw new Error("Insufficient stock");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.cart) {
      user.cart = [];
    }

    const existingItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex >= 0) {
      const newQuantity = user.cart[existingItemIndex].quantity + quantity;

      if (newQuantity > stock) {
        throw new Error("Insufficient stock");
      }

      user.cart[existingItemIndex].quantity = newQuantity;
      user.cart[existingItemIndex].addedAt = new Date();
    } else {
      user.cart.push({
        product: productId,
        quantity,
        addedAt: new Date(),
      });
    }

    await user.save();
    return await getCartItems(userId);
  } catch (error) {
    console.error("Error in addToCart:", error);
    throw error;
  }
};

export const updateCartItem = async (userId, productId, quantity) => {
  if (quantity <= 0) {
    return await removeFromCart(userId, productId);
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const stock = parseInt(product.stock) || 0;
    if (stock < quantity) {
      throw new Error("Insufficient stock");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.cart) {
      throw new Error("Cart is empty");
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      throw new Error("Item not found in cart");
    }

    user.cart[cartItemIndex].quantity = quantity;
    user.cart[cartItemIndex].addedAt = new Date();

    await user.save();
    return await getCartItems(userId);
  } catch (error) {
    console.error("Error in updateCartItem:", error);
    throw error;
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.cart) {
      user.cart = [];
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    return await getCartItems(userId);
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    throw error;
  }
};

export const clearCart = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.cart = [];
    await user.save();

    return { message: "Cart cleared successfully" };
  } catch (error) {
    console.error("Error in clearCart:", error);
    throw error;
  }
};

export const checkout = async (userId, orderData) => {
  try {
    const { name, email, phone, address, paymentMethod } = orderData;

    const cartData = await getCartItems(userId);

    if (cartData.items.length === 0) {
      throw new Error("Cart is empty");
    }

    for (const item of cartData.items) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        throw new Error(`Product ${item.product.name} no longer exists`);
      }

      const stock = parseInt(product.stock) || 0;
      if (stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.product.name}`);
      }
    }

    const orderItems = cartData.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: parseFloat(item.product.price) || 0,
      quantity: item.quantity,
      total: (parseFloat(item.product.price) || 0) * item.quantity,
    }));

    const subtotal = cartData.totalAmount;
    const deliveryFee = subtotal > 1000 ? 0 : 50;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      userId,
      customerInfo: { name, email, phone, address },
      items: orderItems,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
    });

    for (const item of cartData.items) {
      const currentStock = parseInt(item.product.stock) || 0;
      const newStock = Math.max(0, currentStock - item.quantity);

      await Product.findByIdAndUpdate(item.product._id, {
        stock: newStock.toString(),
      });
    }

    await clearCart(userId);

    return order;
  } catch (error) {
    console.error("Error in checkout:", error);
    throw error;
  }
};
