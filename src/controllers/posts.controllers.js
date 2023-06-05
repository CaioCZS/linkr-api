import {
  createPostDB,
  dbDislikePost,
  dbGetPostsByHashtag,
  dbLikePost,
  getAllUsersPostsDB,
  getPostByPostUrlAndUserId,
  updateUserPostDB,
} from "../repository/posts.repositories.js"
import urlMetadata from "url-metadata"

export async function createPost(req, res) {
  const { id } = req.params
  const { description, postUrl } = req.body

  try {
    await createPostDB(description, postUrl, id)
    const post = await getPostByPostUrlAndUserId(postUrl, id)
    const result = {
      id: post.rows[0].id,
      postUrl: post.rows[0].postUrl,
      userId: post.rows[0].userId,
    }
    return res.status(201).send(result)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export async function getAllUsersPosts(req, res) {
  try {
    const posts = await getAllUsersPostsDB()
    return res.send(posts.rows)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export async function updateUserPost(req, res) {
  const { id } = req.params
  const { description } = req.body
  const { session } = res.locals
  const { userId } = session
  try {
    await updateUserPostDB(description, userId, id)
    return res.send("Post updated!")
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deleteUserPost(req, res) {
  const { id } = req.params
  try {
    await deletePost(id)
    res.send("Post deleted!")
  } catch (err) {
    res.status(500).send(err.message)
  }
}
export async function likePost(req, res) {
  const { id } = req.params
  const { session } = res.locals
  const { userId } = session
  try {
    await dbLikePost(id, userId)
    res.send({ message: "Post liked" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function dislikePost(req, res) {
  const { id } = req.params
  const { session } = res.locals
  const { userId } = session
  try {
    await dbDislikePost(id, userId)
    res.send({ message: "Post disliked" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params

  try {
    const { rows: result } = await dbGetPostsByHashtag(hashtag)
    if (result.length === 0) {
      return res.status(404).send({ message: "Esta hashtag não existe" })
    }

    res.send(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
}