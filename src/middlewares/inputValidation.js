import Joi from "joi"

const userCreateScheme = Joi.object({
  first_name: Joi.string().required(),
  last_name:Joi.string().required(),
  email: Joi.string().email().required(),
  password:Joi.string().min(6).required(),
  role:Joi.string().min(4).required().valid("user", "librarian,USER,LIBRARIAN"),
  language:Joi.string().min(2).required().valid("am","en","ar")
});
const loginScheme = Joi.object({
  password:Joi.string().min(6).required(),
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
