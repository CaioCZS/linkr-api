import { Router } from "express"
import validateRequestBody from "../middlewares/schema.middleware.js"
import { createPostSchema, updatePostSchema } from "../schemas/posts.schemas.js"
import {checkExistingPost,checkExistingPostForUpdate,checkExistingUser, checkIfUrlIsAvailable, 
checkIfUserIsPostsOwner} from "../middlewares/posts.middlewares.js"
import {createPost, dislikePost, likePost, updateUserPost} from "../controllers/posts.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const postsRouter = Router()

postsRouter.use(authMiddleware);

postsRouter.post("/users/:id/posts", validateRequestBody(createPostSchema), checkIfUrlIsAvailable, 
checkExistingUser, createPost);
postsRouter.put("/users/:userId/posts/postId", checkExistingPostForUpdate, checkIfUserIsPostsOwner, 
validateRequestBody(updatePostSchema), updateUserPost);
postsRouter.post("/posts/:id/like", checkExistingPost, likePost);
postsRouter.post("/posts/:id/dislike", checkExistingPost, dislikePost);

export default postsRouter
