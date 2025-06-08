import { User } from "../db/models/User.js";
import { Product } from "../db/models/Product.js";
import { Order } from "../db/models/Order.js";

const fixProductImage = (product) => {
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

  if (!product) return product;

  let photo = product.photo;

  if (brokenUrls.includes(photo)) {
    // Використовуємо productId для консистентного вибору зображення
    const productIdStr = product._id ? product._id.toString() : "default";
    const hash = productIdStr
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const imageIndex = hash % workingPhotosFromDB.length;
    photo = workingPhotosFromDB[imageIndex];
  }

  return {
    ...product,
    photo: photo,
    stock: parseInt(product.stock) || 0,
    price: parseFloat(product.price) || 0,
  };
};

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

  const itemsWithFixedImages = validCartItems.map((item) => ({
    ...item,
    product: fixProductImage(item.product),
  }));

  const totalAmount = itemsWithFixedImages.reduce((sum, item) => {
    const price = parseFloat(item.product.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  return {
    items: itemsWithFixedImages,
    totalItems: itemsWithFixedImages.length,
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
      return {
        success: false,
        message: "Insufficient stock",
        availableStock: stock,
        requestedQuantity: quantity,
      };
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
        return {
          success: false,
          message: "Insufficient stock",
          availableStock: stock,
          currentInCart: user.cart[existingItemIndex].quantity,
          requestedQuantity: quantity,
          totalRequested: newQuantity,
        };
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
