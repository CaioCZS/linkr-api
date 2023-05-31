import express from "express"
import authRoute from "./auth.route.js"
import hashtagRouter from "./hashtags.routes.js"
import postsRouter from "./posts.routes.js"

const router = express.Router()

router.use(authRoute)
router.use(hashtagRouter)
router.use(postsRouter)

export default router
