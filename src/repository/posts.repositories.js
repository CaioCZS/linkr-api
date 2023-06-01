import db from "../database/db.connection.js"

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

export function getAllUsersPostsDB(){
  return db.query(`SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 20;`);
}

export function getUserPostById (postId) {
  return db.query(`SELECT * FROM posts WHERE id=$1;`, [postId]);
}

export function updateUserPostDB (description, userId, postId){
  return db.query(`UPDATE posts SET description=$1 WHERE id=$2 AND "userId"=$3;`, [description, postId, userId]);
}

export function deletePost(postId) {
  return db.query(`DELETE FROM posts WHERE id=$1;`, [postId]);
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
