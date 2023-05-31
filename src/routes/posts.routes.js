import { Router } from "express"
import validateRequestBody from "../middlewares/schema.middleware.js"
import { createPostSchema } from "../schemas/posts.schemas.js"
import {
  checkExistingPost,
  checkExistingUser,
  checkIfUrlIsAvailable,
} from "../middlewares/posts.middlewares.js"
import {
  createPost,
  dislikePost,
  likePost,
} from "../controllers/posts.controllers.js"

postsRouter = Router()

postsRouter.post(
  "/users/:id/posts",
  validateRequestBody(createPostSchema),
  checkIfUrlIsAvailable,
  checkExistingUser,
  createPost
)

postsRouter.post("/posts/:id/like", checkExistingPost, likePost)
postsRouter.post("/posts/:id/dislike", checkExistingPost, dislikePost)

export default postsRouter
