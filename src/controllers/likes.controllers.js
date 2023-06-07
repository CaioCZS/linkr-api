import {
  dbDislikePost,
  dbLikePost,
  dbVerifyLike,
} from "../repository/posts.repositories.js"

export async function likePost(req, res) {
  const { id } = req.params
  const { userId } = req.body
  try {
    const { rows: alreadyLiked } = await dbVerifyLike(id, userId)
    if (alreadyLiked.length > 0)
      return res.status(409).send({ message: "Post already liked by you" })

    await dbLikePost(id, userId)
    res.send({ message: "Post liked" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function dislikePost(req, res) {
  const { id } = req.params
  const { userId } = req.body
  try {
    const { rows: alreadyLiked } = await dbVerifyLike(id, userId)
    if (alreadyLiked.length === 0)
      return res
        .status(409)
        .send({ message: "You need to like a post to dislike them" })
    await dbDislikePost(id, userId)
    res.send({ message: "Post disliked" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
