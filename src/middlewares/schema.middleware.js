export default function validateRequestBody(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(422).send(error.details[0].message);
      }
      next();
    };
  }