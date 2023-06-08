import { Router } from "express"
import validateRequestBody from "../middlewares/schema.middleware.js"
import { createPostSchema, updatePostSchema } from "../schemas/posts.schemas.js"
import {
  checkExistingPost,
  checkIfUrlIsAvailable,
  getPostPreview,
} from "../middlewares/posts.middlewares.js"
import {
  createPost,
  deleteUserPost,
  getAllUsersPosts,
  getPostsByHashtag,
  updateUserPost,
} from "../controllers/posts.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import {
  checkExistingUser,
  checkIfUserIsPostsOwner,
} from "../middlewares/users.middlewares.js"

const postsRouter = Router()

postsRouter.post(
  "/users/:id/posts",
  authMiddleware,
  validateRequestBody(createPostSchema),
  checkIfUrlIsAvailable,
  checkExistingUser,
  getPostPreview,
  createPost
)
postsRouter.put(
  "/posts/:id",
  authMiddleware,
  checkExistingPost,
  checkExistingUser,
  checkIfUserIsPostsOwner,
  validateRequestBody(updatePostSchema),
  updateUserPost
)
postsRouter.get("/posts", authMiddleware, getAllUsersPosts)
postsRouter.delete(
  "/posts/:id",
  authMiddleware,
  checkExistingPost,
  checkIfUserIsPostsOwner,
  deleteUserPost
)
postsRouter.get("/posts/hashtag/:hashtag", getPostsByHashtag)

export default postsRouter
