import db from "../database/db.connection.js"

export function dbGetHashtags() {
  const hashtags = db.query(`SELECT * FROM hashtags`)
  return hashtags
}
