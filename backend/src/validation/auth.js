import Joi from "joi";
import { EMAIL_REGEX, PHONE_REGEX } from "../constants/user.js";

export const registerUserSchema = Joi.object({
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

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    "string.pattern.base": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "Refresh token is required",
  }),
});
