import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance, { clearToken, setToken } from "../instance";

export const registerThunk = createAsyncThunk(
  "register",
  async (body, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/register", body);
      toast.success("Registration successful!");
      return response.data.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error("Validation error: please check your data");
            break;
          case 409:
            toast.error("Error: User with this email already exists");
            break;
          default:
            break;
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (body, { rejectWithValue }) => {
    try {
      clearToken();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      const response = await instance.post("/user/login", body);

      const responseData = response.data.data;
      const accessToken = responseData.accessToken;
      const refreshToken = responseData.refreshToken;

      setToken(accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);

      toast.success(`Welcome to E-Pharmacy ${responseData.user.name}!`);
      return responseData;
    } catch (error) {
      toast.error("Email or password is invalid");
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk("logout", async () => {
  try {
    try {
      await instance.get("/user/logout");
    } catch {
      //e
    }

    clearToken();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:auth");
    localStorage.removeItem("persist:pharmacy");

    toast.success("User logged out successfully");

    return { success: true };
  } catch {
    clearToken();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:auth");
    localStorage.removeItem("persist:pharmacy");

    return { success: true };
  }
});

export const getUserInfoThunk = createAsyncThunk(
  "user-info",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/user/user-info");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
