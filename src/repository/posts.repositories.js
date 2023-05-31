import { db } from "../database/db.connection.js"

export function createPostDB(description, postUrl, userId) {
  return db.query(
    `INSERT INTO posts ("description", "postUrl", "userId") VALUES ($1, $2, $3);`,
    [description, postUrl, userId]
  )
}

export function getPostByPostUrlAndUserId(postUrl, userId) {
  return db.query(
    `SELECT * FROM posts WHERE "postUrl" = $1 AND "userId" = $2;`,
    [postUrl, userId]
  )
}

export function dbGetPostById(id) {
  const post = db.query(`SELECT * FROM posts WHERE id=$1`, [id])
  return post
}

export function dbLikePost(postId, likerId) {
  return db.query(`INSERT INTO likes ("postId","likerId") VALUES ($1,$2)`, [
    postId,
    likerId,
  ])
}

export function dbDislikePost(postId, likerId) {
  return db.query(`DELETE FROM likes WHERE "postId"=$1 AND "likerId"=$2`, [
    postId,
    likerId,
  ])
}
