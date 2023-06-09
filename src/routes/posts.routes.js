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
  createPostComment,
  deleteUserPost,
  getAllUsersPosts,
  getPostsByHashtag,
  repostCreation,
  updateUserPost,
  verifyNewPosts,
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
postsRouter.post("/repost/:id", authMiddleware, repostCreation)
postsRouter.get("/posts", authMiddleware, getAllUsersPosts)
postsRouter.delete(
  "/posts/:id",
  authMiddleware,
  checkExistingPost,
  checkIfUserIsPostsOwner,
  deleteUserPost
)
postsRouter.post("/posts/:id/comment", authMiddleware, createPostComment)
postsRouter.get("/posts/hashtag/:hashtag", getPostsByHashtag)
postsRouter.get("/posts/newPosts/:id", authMiddleware, verifyNewPosts)

export default postsRouter
