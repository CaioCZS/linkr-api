import { Router } from "express";
import {
  deleteFollow,
  getFollow,
  postFollow,
} from "../controllers/follow.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const followRouter = Router();

followRouter.get("/follow", authMiddleware, getFollow);
followRouter.post("/follow", authMiddleware, postFollow);
followRouter.delete("/follow", authMiddleware, deleteFollow);

export default followRouter;
