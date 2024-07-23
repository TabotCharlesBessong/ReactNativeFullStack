import express from "express";
import {
  activateUser,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
} from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate", activateUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/social-auth", socialAuth)

export default userRouter;
