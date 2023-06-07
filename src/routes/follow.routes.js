import { Router } from "express";
import {
  deleteFollow,
  postFollow,
  postGetFollow,
} from "../controllers/follow.controller.js";

const followRouter = Router();

followRouter.post("/follow/get", postGetFollow);
followRouter.post("/follow/post", postFollow);
followRouter.delete("/follow", deleteFollow);

export default followRouter;
