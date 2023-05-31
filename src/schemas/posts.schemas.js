import joi from "joi";

export const createPostSchema = joi.object({
    description: joi.string(),
    postUrl: joi.string().uri().required()
})