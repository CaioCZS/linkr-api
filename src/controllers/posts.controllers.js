import { createPostDB, getPostByPostUrlAndUserId } from "../repository/posts.repositories.js";

export async function createPost(req, res){
    const {id} = req.params;
    const {description, postUrl} = req.body;

    try{
        await createPostDB(description, postUrl, id);
        const post = await getPostByPostUrlAndUserId (postUrl, id);
        const result = {
            id: post.rows[0].id,
            postUrl: post.rows[0].postUrl,
            userId: post.rows[0].userId
        }
        return res.status(201).send(result);

    } catch(err){
        return res.status(500).send(err.message);
    }
}