import fetch from "node-fetch";
import { getUserById } from "../repository/users.repositories.js";
import { getUserPostById } from "../repository/posts.repositories.js";
export async function checkIfUrlIsAvailable(req, res, next) {
  const { postUrl } = req.body

  try {
    const response = await fetch(postUrl)

    if (response.ok) {
      next()
    } else {
      return res.status(404).send("URL not found!")
    }
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export async function checkExistingUser(req, res, next) {
  const { id } = req.params

  try {
    const user = await getUserById(id)
    if (user.rowCount === 0) return res.status(404).send("Usuário not found!")
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export async function checkExistingPost(req, res, next) {
  const { id } = req.params

  if (!id) return res.status(404).send("Post not found!")

  try {
    const post = await getUserPostById(id)
    if (post.rowCount === 0) return res.status(404).send("Post not found!")
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export async function checkExistingPostForUpdate(req, res, next) {
  const { postId } = req.params;
  try{
    const post = await getUserPostById (postId);
    if (post.rowCount === 0) return res.status(404).send("Post not found!");
    res.locals.post = post;
    next();
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export async function checkIfUserIsPostsOwner(req, res, next) {
  const {post} = res.locals;
  try{
    if (post.rows[0].userId !== userId) return res.status(401).send("This user is not this post owner!");
    next();
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
