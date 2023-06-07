import db from "../database/db.connection.js";

export async function dbGetFollow(id, userId) {
  const result = await db.query(
    `SELECT * FROM followers WHERE "followerId" = $1 and "followingId" = $2;`,
    [userId, id]
  );
  return result;
}

export async function dbPostFollow(id, userid) {
  const result = await db.query(
    `INSERT INTO followers ("followerId", "followingId") VALUES ($1, $2);`,
    [userid, id]
  );
  return result;
}

export async function dbDeleteFollow(id, userid) {
  const result = await db.query(
    `DELETE FROM followers WHERE "followerId" = $1 and "followingId" = $2;`,
    [userid, id]
  );
  return result;
}
