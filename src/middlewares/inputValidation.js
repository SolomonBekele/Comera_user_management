import Joi from "joi"

const userCreateScheme = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name:Joi.string(),
  password:Joi.string().required(),
  email: Joi.string().email().required(),
});
const loginScheme = Joi.object({
  password:Joi.string().required(),
  email: Joi.string().email().required(),
});

export const validateCreateUser = (req, res, next) => {
  const { error } = userCreateScheme.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};

export const validateLoginUser = (req, res, next) => {
  const { error } = loginScheme.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};
