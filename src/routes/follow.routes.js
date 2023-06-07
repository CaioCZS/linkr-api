import { Router } from "express";
import { deleteFollow, getFollow, postFollow } from "../controllers/follow.controller.js";

const followRouter = Router();

followRouter.get("/follow", getFollow);
followRouter.post("/follow", postFollow);
followRouter.delete("/follow", deleteFollow);

export default followRouter;
