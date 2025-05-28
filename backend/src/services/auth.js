import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../db/models/User.js";
import { Session } from "../db/models/Session.js";

import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from "../constants/user.js";

const generateToken = () => crypto.randomBytes(32).toString("hex");

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const registerUser = async (userData) => {
  const { name, email, phone, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  await Session.deleteMany({ userId: user._id });

  const session = await Session.create({
    userId: user._id,
    accessToken: generateToken(),
    refreshToken: generateToken(),
  });

  return { user, session };
};

export const getSession = async (filter) => {
  return await Session.findOne(filter);
};

export const getUser = async (filter) => {
  return await User.findOne(filter);
};

export const logoutUser = async (accessToken) => {
  const session = await Session.findOne({ accessToken });
  if (session) {
    await Session.deleteOne({ _id: session._id });
  }
  return true;
};

export const refreshToken = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw new Error("Invalid refresh token");
  }

  if (Date.now() > session.refreshTokenValidUntil) {
    await Session.deleteOne({ _id: session._id });
    throw new Error("Refresh token expired");
  }

  const newAccessToken = generateToken();
  const newRefreshToken = generateToken();

  await Session.findByIdAndUpdate(session._id, {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFETIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });

  const updatedSession = await Session.findById(session._id);
  return updatedSession;
};
