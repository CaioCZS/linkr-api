import { Router } from "express";
import { getSearch } from "../controllers/search.controller.js";

const searchRouter = Router();

searchRouter.get("/search/query", getSearch);

export default searchRouter;
