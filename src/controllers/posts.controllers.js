import {
  createPostDB,
  dbGetPostsByHashtag,
  getAllUsersPostsDB,
  getPostByPostUrlAndUserId,
  updateUserPostDB,
  deletePost,
  dbGetFollowersPost,
} from "../repository/posts.repositories.js"

export async function createPost(req, res) {
  const { id } = req.params
  const { description, postUrl } = req.body

  const { preview } = res.locals
  const { title, images } = preview
  const titlePreview = title
  const imagePreview = images[0]
  const descriptionPreview = preview.description

  try {
    await createPostDB(
      description,
      postUrl,
      id,
      titlePreview,
      imagePreview,
      descriptionPreview
    )
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
  const { session } = res.locals
  const { userId } = session
  try {
    const { rows: followingExist } = await dbGetFollowersPost(userId)
    if (followingExist.length === 0) {
      return res
        .status(404)
        .send("You don't follow anyone yet. Search for new friends!")
    }
    const { rows: posts } = await getAllUsersPostsDB(userId)
    if (posts.length === 0) {
      return res.status(404).send("No posts found from your friends")
    }
    return res.send(posts)
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
