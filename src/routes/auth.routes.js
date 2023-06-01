import express from "express";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import { getUserByParams, logoutSession, signIn, signUp } from "../controllers/auth.controller.js";
import validateRequestBody from "../middlewares/schema.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoute = express.Router();

authRoute.post("/signup", validateRequestBody(signUpSchema), signUp);
authRoute.post("/signin", validateRequestBody(signInSchema), signIn);
authRoute.get("/user/:id", getUserByParams);
authRoute.delete("/logout", authMiddleware, logoutSession);

export default authRoute;
