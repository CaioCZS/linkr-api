import { dbGetHashtags } from "../repository/hashtags.repository.js"

export async function getHashtags(req, res) {
  try {
    const { rows: result } = await dbGetHashtags()
    res.send(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
