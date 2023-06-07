import { Router } from "express";
import { getSearch } from "../controllers/search.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const searchRouter = Router();

searchRouter.get("/search/query", authMiddleware, getSearch);

export default searchRouter;
