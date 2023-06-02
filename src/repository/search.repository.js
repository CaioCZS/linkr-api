import db from "../database/db.connection.js";

export async function dbGetSearch(searchValue) {
  const result = await db.query(
    `SELECT * FROM users WHERE username ILIKE '%${searchValue}%';`
  );
  return result;
}
