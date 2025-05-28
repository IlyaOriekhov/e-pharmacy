import createHttpError from "http-errors";

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return next(createHttpError(400, errorMessages.join(", ")));
    }

    req.body = value;
    next();
  };
};
