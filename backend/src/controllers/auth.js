import createHttpError from "http-errors";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken as refreshTokenService,
} from "../services/auth.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    if (error.message === "User with this email already exists") {
      throw createHttpError(409, error.message);
    }
    throw createHttpError(500, "Failed to register user");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, session } = await loginUser(email, password);

    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
    });
  } catch (error) {
    if (error.message === "Invalid email or password") {
      throw createHttpError(401, error.message);
    }
    throw createHttpError(500, "Failed to login user");
  }
};

export const logout = async (req, res) => {
  try {
    const authHeader = req.get("Authorization");

    if (authHeader) {
      const [bearer, accessToken] = authHeader.split(" ");
      if (bearer === "Bearer" && accessToken) {
        await logoutUser(accessToken);
      }
    }

    res.status(200).json({
      status: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);

    throw createHttpError(500, "Failed to logout user");
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      status: 200,
      message: "User info retrieved successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error(error);

    throw createHttpError(500, "Failed to get user info");
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const session = await refreshTokenService(refreshToken);

    res.status(200).json({
      status: 200,
      message: "Token refreshed successfully",
      data: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
    });
  } catch (error) {
    if (error.message.includes("token")) {
      throw createHttpError(401, error.message);
    }
    throw createHttpError(500, "Failed to refresh token");
  }
};
