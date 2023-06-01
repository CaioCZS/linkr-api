import db from "../database/db.connection.js";

export async function createSession(userId, token) {
  try {
    await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [
      userId,
      token,
    ]);
  } catch (err) {
    console.error(err);
    throw new Error("Error creating session");
  }
}

export async function getSessionByToken(token) {
  try {
    const result = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [
      token,
    ]);

    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Error getting session by token");
  }
}

export async function deleteSession(token) {
  try {
    await db.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting session");
  }
}
