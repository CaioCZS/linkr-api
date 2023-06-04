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

export function getAllUsersPostsDB() {
  return db.query(`SELECT 
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
  GROUP BY p.id, u.username, u.image
  ORDER BY p.id DESC 
  LIMIT 20;`)
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

export function dbGetPostsByHashtag(hashtag) {
  return db.query(
    `
  SELECT  posts.*,users.username,users.image,
	(SELECT JSON_AGG(JSON_BUILD_OBJECT('id' ,h.id,'hashtag',h.name ) 
		)FROM hashtags h
	 JOIN posts_hashtags ph ON h.id = ph."hashtagId"
	 WHERE ph."postId" = posts.id
	) as hashtags,
		(SELECT COUNT(likes."postId") 
        FROM likes 
        WHERE likes."postId" = posts.id
    ) as "likesCount",
	 (SELECT JSON_AGG(JSON_BUILD_OBJECT('id', users.id, 'name', users.username)) 
        FROM likes
        JOIN users ON users.id = likes."likerId"
        WHERE likes."postId" = posts.id
    ) as likers
	FROM posts_hashtags
			JOIN posts ON posts.id = posts_hashtags."postId"
			JOIN users ON users.id = posts."userId"
		WHERE posts.id IN (
    SELECT posts_hashtags."postId"
    FROM hashtags
    JOIN posts_hashtags ON posts_hashtags."hashtagId" = hashtags.id
    WHERE hashtags.name = $1
)
GROUP BY posts.id, users.username, users.image;
  `,
    [hashtag]
  )
}
