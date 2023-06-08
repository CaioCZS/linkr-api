import db from "../database/db.connection.js"

export function createPostDB(
  description,
  postUrl,
  userId,
  titlePreview,
  imagePreview,
  descriptionPreview
) {
  return db.query(
    `INSERT INTO posts ("description", "postUrl", "userId", "titlePreview", "imagePreview", "descriptionPreview") VALUES ($1, $2, $3, $4, $5, $6);`,
    [
      description,
      postUrl,
      userId,
      titlePreview,
      imagePreview,
      descriptionPreview,
    ]
  )
}

export function getPostByPostUrlAndUserId(postUrl, userId) {
  return db.query(
    `SELECT * FROM posts WHERE "postUrl" = $1 AND "userId" = $2;`,
    [postUrl, userId]
  )
}

export function getAllUsersPostsDB(userId) {
  return db.query(
    `SELECT
  p.*,
  u.username,
  u.image,
  (SELECT json_agg(json_build_object('id', h.id, 'hashtag', h.name))
   FROM hashtags h
            JOIN posts_hashtags ph ON h.id = ph."hashtagId"
   WHERE ph."postId" = p.id) AS hashtags,
  COUNT(l."postId") AS "likesCount",
  (SELECT json_agg(json_build_object('id', u.id, 'name', u.username))
   FROM likes l
            JOIN users u ON u.id = l."likerId"
   WHERE l."postId" = p.id) AS likers
FROM posts p
       JOIN users u ON u.id = p."userId"
       LEFT JOIN likes l ON l."postId" = p.id
       JOIN followers f ON f."followingId" = p."userId"
WHERE f."followerId" = $1
GROUP BY p.id, u.username, u.image
ORDER BY p.id DESC
LIMIT 10;`,
    [userId]
  )
}

export function getUserPostById(postId) {
  return db.query(`SELECT * FROM posts WHERE id=$1;`, [postId])
}

export function updateUserPostDB(description, userId, postId) {
  return db.query(
    `UPDATE posts SET description=$1 WHERE id=$2 AND "userId"=$3;`,
    [description, postId, userId]
  )
}

export function deletePost(postId) {
  return db.query(`DELETE FROM posts WHERE id=$1;`, [postId])
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

export function dbVerifyLike(postId, likerId) {
  return db.query(`SELECT * FROM likes WHERE "postId"=$1 AND "likerId"=$2`, [
    postId,
    likerId,
  ])
}

export function dbGetPostsByHashtag(hashtag) {
  return db.query(
    `
    SELECT 
    p.*, u.username, u.image,
    (SELECT json_agg(json_build_object('id', h.id, 'hashtag', h.name))
     FROM hashtags h
     JOIN posts_hashtags ph ON h.id = ph."hashtagId"
     WHERE ph."postId" = p.id
    ) AS hashtags,
    COUNT(l."postId") AS "likesCount",
    (SELECT json_agg(json_build_object('id', u.id, 'name', u.username))
     FROM likes l
     JOIN users u ON u.id = l."likerId"
     WHERE l."postId" = p.id
    ) AS likers
FROM posts p
JOIN users u ON u.id = p."userId"
LEFT JOIN likes l ON l."postId" = p.id
WHERE p.id IN (
    SELECT posts_hashtags."postId"
    FROM hashtags
    JOIN posts_hashtags ON posts_hashtags."hashtagId" = hashtags.id
    WHERE hashtags.name = $1
)
GROUP BY p.id, u.username, u.image;
  `,
    [hashtag]
  )
}

export function getPostsById(id) {
  return db.query(
    `SELECT 
  p.*, u.username, u.image,
  (SELECT json_agg(json_build_object('id', h.id, 'hashtag', h.name))
  FROM hashtags h
  JOIN posts_hashtags ph ON h.id = ph."hashtagId"
  WHERE ph."postId" = p.id
  ) AS hashtags,
  COUNT(l."postId") AS "likesCount",
  (SELECT json_agg(json_build_object('id', u.id, 'name', u.username))
  FROM likes l
  JOIN users u ON u.id = l."likerId"
  WHERE l."postId" = p.id
  ) AS likers
FROM posts p
JOIN users u ON u.id = p."userId"
LEFT JOIN likes l ON l."postId" = p.id WHERE P."userId" = $1
GROUP BY p.id, u.username, u.image`,
    [id]
  )
}
