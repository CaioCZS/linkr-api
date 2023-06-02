import { dbGetSearch } from "../repository/search.repository.js";

export async function getSearch(req, res) {
    const { searchValue } = req.query;
  try {
    const { rows: result } = await dbGetSearch(searchValue);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
