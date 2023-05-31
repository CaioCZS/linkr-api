import db from "../database/db.connection.js";
import bcrypt from "bcrypt";

export async function getUserByEmail(email) {
  try {
    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting user by email");
  }
}

export async function getUserById(id) {
  try {
    const result = await db.query(`SELECT * FROM users WHERE id = $1;`, [
      id,
    ]);
    
    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Error getting user by id");
  }
}

export async function createUser(body) {
  try {
    const { username, email, password, image } = body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const create = await db.query(
      `INSERT INTO users (username, email, password, image) VALUES ($1, $2, $3, $4);`,
      [username, email, hashPassword, image]
    );
  } catch (err) {
    console.error(err);
    throw new Error("Error creating user");
  }
}