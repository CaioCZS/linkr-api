import { getSessionByToken } from "../repository/session.repository.js";


export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const session = await getSessionByToken(token);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.session = session;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
