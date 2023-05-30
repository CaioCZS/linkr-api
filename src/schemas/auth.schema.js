import joi from "joi";

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
});

export const signUpSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
  image: joi.string().required(),
});

