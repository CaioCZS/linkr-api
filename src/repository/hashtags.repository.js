import db from "../database/db.connection.js"

export function dbGetHashtags() {
  const hashtags =
    db.query(`SELECT COUNT(posts_hashtags."hashtagId") as "timesUsed",posts_hashtags."hashtagId",hashtags.name FROM posts_hashtags
  JOIN hashtags ON hashtags.id = posts_hashtags."hashtagId"
  GROUP BY "hashtagId",hashtags.name 
  ORDER BY "timesUsed",posts_hashtags."hashtagId" DESC LIMIT 10;`)
  return hashtags
}

export function dbGetAllHashtags() {
  return db.query(`SELECT * FROM hashtags`)
}

export function dbAddHashtagTable(hashtags, dbHastags) {
  const values = []
  hashtags.forEach((h) => {
    if (!dbHastags.some((hashtag) => hashtag.name === h)) {
      values.push(h)
    }
  })

  const query = `
  INSERT INTO hashtags (name)
  VALUES ${values.map((_, index) => `($${index + 1})`).join(", ")}
`

  return db.query(query, values)
}
