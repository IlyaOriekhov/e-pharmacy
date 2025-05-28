import Joi from "joi";
import {
  EMAIL_REGEX,
  PHONE_REGEX,
  PAYMENT_METHODS,
} from "../constants/user.js";

export const addToCartSchema = Joi.object({
  productId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid product ID format",
      "any.required": "Product ID is required",
    }),

  quantity: Joi.number().integer().min(1).max(100).default(1).messages({
    "number.min": "Quantity must be at least 1",
    "number.max": "Quantity cannot exceed 100",
    "number.integer": "Quantity must be a whole number",
  }),
});

export const updateCartSchema = Joi.object({
  productId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid product ID format",
      "any.required": "Product ID is required",
    }),

  quantity: Joi.number().integer().min(1).max(100).required().messages({
    "number.min": "Quantity must be at least 1",
    "number.max": "Quantity cannot exceed 100",
    "number.integer": "Quantity must be a whole number",
    "any.required": "Quantity is required",
  }),
});

export const removeFromCartSchema = Joi.object({
  productId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid product ID format",
      "any.required": "Product ID is required",
    }),
});

export const checkoutSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    "string.pattern.base": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  phone: Joi.string().pattern(PHONE_REGEX).required().messages({
    "string.pattern.base": "Please provide a valid phone number",
    "any.required": "Phone number is required",
  }),

  address: Joi.string().min(10).max(200).required().messages({
    "string.min": "Address must be at least 10 characters long",
    "string.max": "Address cannot exceed 200 characters",
    "any.required": "Delivery address is required",
  }),

  paymentMethod: Joi.string()
    .valid(...PAYMENT_METHODS)
    .required()
    .messages({
      "any.only": `Payment method must be one of: ${PAYMENT_METHODS.join(
        ", "
      )}`,
      "any.required": "Payment method is required",
    }),
});
