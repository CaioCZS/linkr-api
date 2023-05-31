import {db} from "../database/db.connection.js";

export function getUserById (id) {
    return db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
}