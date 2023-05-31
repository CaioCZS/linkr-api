import {db} from "../database/db.connection.js";

export function createPostDB (description, postUrl, userId) {
    return db.query(`INSERT INTO posts ("description", "postUrl", "userId") VALUES ($1, $2, $3);`, [description, postUrl, userId]);
}

export function getPostByPostUrlAndUserId (postUrl, userId) {
    return db.query(`SELECT * FROM posts WHERE "postUrl" = $1 AND "userId" = $2;`, [postUrl, userId]);
}