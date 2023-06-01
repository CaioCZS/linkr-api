import { getSessionByToken } from "../repository/session.repository.js"

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: "Unauthorized" })
  }

  const [type, token] = authHeader.split(" ")

  if (type !== "Bearer" || !token) {
    return res.status(401).send({ error: "Unauthorized" })
  }

  try {
    const session = await getSessionByToken(token)

    if (!session) {
      return res.status(401).send({ error: "Unauthorized" })
    }

    next()
  } catch (err) {
    console.error(err)
    return res.status(500).send({ error: "Internal server error" })
  }
}
