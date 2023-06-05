import db from "../database/db.connection.js"

export function dbGetHashtags() {
  const hashtags =
    db.query(`SELECT COUNT(posts_hashtags."hashtagId") as "timesUsed",posts_hashtags."hashtagId",hashtags.name FROM posts_hashtags
  JOIN hashtags ON hashtags.id = posts_hashtags."hashtagId"
  GROUP BY "hashtagId",hashtags.name 
  ORDER BY "timesUsed" DESC LIMIT 10;`)
  return hashtags
}
