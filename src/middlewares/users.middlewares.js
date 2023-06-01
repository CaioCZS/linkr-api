import { getUserById } from "../repository/users.repositories.js";

export async function checkExistingUser(req, res, next) {
    const {session} = res.locals;
    const {userId} = session;
  
    try {
      const user = await getUserById(userId);
      if (user.rowCount === 0) return res.status(404).send("User not found!")
      next()
    } catch (err) {
      return res.status(500).send(err.message)
    }
}

export async function checkIfUserIsPostsOwner(req, res, next) {
    const {post} = res.locals;
    const {session} = res.locals;
    const {userId} = session;
    try{
        if (post.rows[0].userId !== userId) return res.status(401).send("This user is not this post owner!");
        next();
    } catch (err) {
        return res.status(500).send(err.message)
    }
}