//VALIDATION
const Joi = require("@hapi/joi");

//Register validation
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(14).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    bio: Joi.string().min(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
//Login validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

//update user validation
const updateUserValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(14),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6),
    bio: Joi.string().min(15),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
// create post validation

const postValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(15).required(),
    description: Joi.string().min(500).required(),
    author: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

// edit post validation

const editpostValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(15).required(),
    description: Joi.string().min(500).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

//Message validation
const messageValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    subject: Joi.string().min(6).required(),
    message: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.messageValidation = messageValidation;
module.exports.editpostValidation = editpostValidation;
module.exports.updateUserValidation = updateUserValidation;
