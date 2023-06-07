import express from "express"
import authRoute from "./auth.routes.js"
import hashtagRouter from "./hashtags.routes.js"
import postsRouter from "./posts.routes.js"
import searchRouter from "./search.routes.js"
import likesRouter from "./likes.routes.js"

const router = express.Router()

router.use(authRoute)
router.use(hashtagRouter)
router.use(likesRouter)
router.use(postsRouter)
router.use(searchRouter)

export default router
