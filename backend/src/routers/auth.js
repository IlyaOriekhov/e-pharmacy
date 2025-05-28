import { Router } from "express";
import {
  register,
  login,
  logout,
  getUserInfo,
  refreshToken,
} from "../controllers/auth.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  registerUserSchema,
  loginUserSchema,
  refreshTokenSchema,
} from "../validation/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerUserSchema), register);
authRouter.post("/login", validateBody(loginUserSchema), login);
authRouter.post("/refresh", validateBody(refreshTokenSchema), refreshToken);

authRouter.get("/logout", authenticate, logout);
authRouter.get("/user-info", authenticate, getUserInfo);

export default authRouter;
