import { Router } from "express";
import validateRequestBody from "../middlewares/schema.middleware.js";
import { createPostSchema } from "../schemas/posts.schemas.js";
import { checkExistingUser, checkIfUrlIsAvailable } from "../middlewares/posts.middlewares.js";
import { createPost } from "../controllers/posts.controllers.js";

postsRouter = Router();

postsRouter.post("/users/:id/posts", validateRequestBody(createPostSchema), checkIfUrlIsAvailable, checkExistingUser, createPost);

export default postsRouter;
