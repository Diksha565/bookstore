import express from "express";
import {
  handleAdminLogin,
  handleUserRegister,
  handleUserLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", handleUserRegister);
userRouter.post("/Login", handleUserLogin);
userRouter.post("/admin", handleAdminLogin);

export default userRouter;
