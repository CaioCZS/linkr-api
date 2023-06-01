import { Router } from "express"
import validateRequestBody from "../middlewares/schema.middleware.js"
import { createPostSchema, updatePostSchema } from "../schemas/posts.schemas.js"
import {checkExistingPost, checkIfUrlIsAvailable} from "../middlewares/posts.middlewares.js"
import {createPost, deleteUserPost, dislikePost, getAllUsersPosts, likePost, updateUserPost} from "../controllers/posts.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { checkExistingUser, checkIfUserIsPostsOwner } from "../middlewares/users.middlewares.js"

const postsRouter = Router()

postsRouter.use(authMiddleware);

postsRouter.post("/users/:id/posts", validateRequestBody(createPostSchema), checkIfUrlIsAvailable, 
checkExistingUser, createPost);
postsRouter.put("/posts/:id", checkExistingUser, checkIfUserIsPostsOwner, 
validateRequestBody(updatePostSchema), updateUserPost);
postsRouter.get("/posts", getAllUsersPosts);
postsRouter.delete("/posts/:id", checkExistingPost, checkIfUserIsPostsOwner, deleteUserPost);
postsRouter.post("/posts/:id/like", checkExistingPost, likePost);
postsRouter.post("/posts/:id/dislike", checkExistingPost, dislikePost);

export default postsRouter
