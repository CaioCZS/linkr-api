import fetch from "node-fetch"
import { getUserById } from "../repository/users.repositories.js"
import { dbGetPostById } from "../repository/posts.repositories.js"
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
    const post = await dbGetPostById(id)
    if (post.rowCount === 0) return res.status(404).send("Post not found!")
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
