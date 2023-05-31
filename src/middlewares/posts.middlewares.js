import fetch from "node-fetch";
import { getUserById } from "../repository/users.repositories.js";
export async function checkIfUrlIsAvailable (req, res, next){
  const {postUrl} = req.body;

  try{
      const response = await fetch(postUrl);

      if (response.ok) {
          next();
        } else {
          return res.status(404).send('URL not found!');
        }
  } catch (err){
      return res.status(500).send(err.message);
  }
}

export async function checkExistingUser (req, res, next){
  const {id} = req.params;

  try{
    const user = await getUserById(id);
    if (user.rowCount === 0) return res.status(404).send('Usuário not found!');
    next();
} catch (err){
    return res.status(500).send(err.message);
}

}