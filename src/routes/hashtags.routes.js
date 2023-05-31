import { Router } from "express"
import { getHashtags } from "../controllers/hashtags.controllers.js"

const hashtagRouter = Router()

hashtagRouter.get("/hashtags", getHashtags)

export default hashtagRouter
