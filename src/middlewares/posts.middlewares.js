import fetch from "node-fetch";
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

export async function checkExistingPost(req, res, next) {
  const { id } = req.params

  if (!id) return res.status(404).send("Post not found!")

  try {
    const post = await getUserPostById(id)
    if (post.rowCount === 0) return res.status(404).send("Post not found!")
    res.locals.post = post
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

export async function getPostPreview (req, res, next){
  const {postUrl} = req.body;

  try {
    const response = await fetch(`https://jsonlink.io/api/extract?url=${postUrl}`);

    if (response.ok) {
      const data = await response.json();
      res.locals.preview = data;
      next();
    } 
  } catch (err) {
    return res.status(500).send(err.message)
  }
}



