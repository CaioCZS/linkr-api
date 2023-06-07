import {
  dbDeleteFollow,
  dbGetFollow,
  dbPostFollow,
} from "../repository/follow.repository.js";

export async function postGetFollow(req, res) {
  const { id, userId } = req.body;
  try {
    const { rows: result } = await dbGetFollow(id, userId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postFollow(req, res) {
  const { id, userId } = req.body;
  try {
    const { rows: result } = await dbPostFollow(id, userId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteFollow(req, res) {
  const { id, userId } = req.body;
  try {
    const { rows: result } = await dbDeleteFollow(id, userId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
