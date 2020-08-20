//VALIDATION
const Joi = require("@hapi/joi");

//Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    bio: Joi.string().min(15).required(),
  });

  // VALIDATING THE DATA BEFORE SAVING A USER
  return schema.validate(data);
};
//Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  // VALIDATING THE DATA BEFORE SAVING A USER
  return schema.validate(data);
};

// create post validation

const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(15).required(),
    description: Joi.string().min(500).required(),
    author: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// edit post validation

const editpostValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(15).required(),
    description: Joi.string().min(500).required(),
  });
  return schema.validate(data);
};

//Message validation
const messageValidation = (data) => {
  const schema = Joi.object({
    names: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    subject: Joi.string().min(6).required(),
    message: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.messageValidation = messageValidation;
module.exports.editpostValidation = editpostValidation;
