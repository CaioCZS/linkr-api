import { Router } from "express"
import { checkExistingPost } from "../middlewares/posts.middlewares.js"
import { dislikePost, likePost } from "../controllers/likes.controllers.js"

const likesRouter = Router()

likesRouter.post("/like/:id", checkExistingPost, likePost)
likesRouter.post("/dislike/:id", checkExistingPost, dislikePost)

export default likesRouter
