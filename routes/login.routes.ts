import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

export const loginRouter = Router();

loginRouter.post("/register", registerUser);
loginRouter.post("/login", loginUser);