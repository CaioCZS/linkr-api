import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserById,
  getUserByEmail,
} from "../repository/users.repositories.js";
import {
  createSession,
  deleteSession,
  getSessionByToken,
} from "../repository/session.repository.js";
import { getPostsById } from "../repository/posts.repositories.js";

const key = process.env.JWT_SECRET || "super_secret_key";

export async function signUp(req, res) {
  try {
    const { email } = req.body;
    const { rows } = await getUserByEmail(email);

    if (rows.length > 0) {
      return res.status(409).send({ error: "User already exists" });
    }

    await createUser(req.body);

    return res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function signIn(req, res) {
  try {
    console.log("LOGUEMO");
    const { email, password } = req.body;

    const { rows } = await getUserByEmail(email);

    if (rows.length === 0) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, key);

    await createSession(user.id, token);

    return res.status(200).send({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function signOut(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    await deleteSession(token);

    return res.status(200).send({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function getUser(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const session = await getSessionByToken(token);

    if (!session) {
      return res.status(401).send({ error: "Invalid token" });
    }

    const user = await getUserById(session.user_id);

    return res.status(200).send({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function getUserByParams(req, res) {
  const { id } = req.params;

  try {
    const token = req.headers.authorization.split(" ")[1];

    const session = await getSessionByToken(token);

    if (!session) {
      return res.status(401).send({ error: "Invalid token" });
    }

    const posts = await getPostsById(id);

    return res.status(200).send(posts.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function logoutSession(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await deleteSession(token);
    return res.status(200).send({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  } 
}
