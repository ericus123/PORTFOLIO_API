const Joi = require("@hapi/joi");

export const userValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(12)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "First name must contain letters only ",
        "string.empty": "Please fill in your first name",
        "string.min": "Fisrt name must be at least {#limit} characters long",
        "string.max": "First name must be below {#limit} characters long",
        "any.required": "First name is required",
      }),
    lastName: Joi.string()
      .min(3)
      .max(12)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "Last name must contain letters only ",
        "string.empty": "Please fill in your last name",
        "string.min": "Last name must be at least {#limit} characters long",
        "string.max": "Last name must be below {#limit} characters long",
        "any.required": "Last name is required",
      }),
    username: Joi.string()
      .min(3)
      .max(12)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "Username must contain letters only ",
        "string.empty": "Please fill in your username",
        "string.min": "Username must be at least {#limit} characters long",
        "string.max": "Username must be below {#limit} characters long",
        "any.required": "Username is required",
      }),
    email: Joi.string().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Please fill in your email",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password must be string",
      "string.empty": "Please fill in your password",
      "string.min": "Password must be at least {#limit} characters long",
      "any.required": "Password is required",
    }),
    confPassword: Joi.string().min(8).required().messages({
      "string.base": "Password Confirmation must be string",
      "string.empty": "Please confirm your password",
      "string.min":
        "Password confirmation must be at least {#limit} characters long",
      "any.required": "Password confirmation is required",
    }),

    subscribedNewsLetter: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const userRoleAssignValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Please fill in your email",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
    role: Joi.string()
      .trim()
      .valid("basic", "admin", "superAdmin")
      .required()
      .messages({
        "any.required": "Role is required",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const emailValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Please fill in your email",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateEmails = (req, res, next) => {
  const schema = Joi.object({
    message: Joi.string().min(10).required().messages({
      "string.base": "Mesage must be a valid text ",
      "string.empty": "Please add a message",
      "string.min": "Message must be at least {#limit} characters long",
      "any.required": "Message is required",
    }),
    emails: Joi.array()
      .required()
      .items(
        Joi.string().min(8).email().required().messages({
          "string.base": "Email must be a string",
          "string.email": "Invalid email",
          "string.empty": "Please fill in your email",
          "string.min": "Email must be at least {#limit} characters long",
          "any.required": "Email is required",
        })
      ),
    subject: Joi.string().min(10).max(100).required().messages({
      "string.base": "Subject must be a valid text ",
      "string.empty": "Please add a subject",
      "string.min": "Subject must be at least {#limit} characters long",
      "string.max": "Subject must be below {#limit} characters long",
      "any.required": "Subject is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const validateEmail = (req, res, next) => {
  const schema = Joi.object({
    message: Joi.string().min(10).required().messages({
      "string.base": "Mesage must be a valid text ",
      "string.empty": "Please add a message",
      "string.min": "Message must be at least {#limit} characters long",
      "any.required": "Message is required",
    }),
    email: Joi.string().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Please fill in your email",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
    subject: Joi.string().min(10).max(100).required().messages({
      "string.base": "Subject must be a valid text ",
      "string.empty": "Please add a subject",
      "string.min": "Subject must be at least {#limit} characters long",
      "string.max": "Subject must be below {#limit} characters long",
      "any.required": "Subject is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const uploadImageValidation = (req, res, next) => {
  const schema = Joi.object({
    image: Joi.string().required().messages({
      "string.empty": "Profile image is required",
      "any.required": "Profile image is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const completeProfileValidation = (req, res, next) => {
  const schema = Joi.object({
    occupation: Joi.string()
      .min(3)
      .max(30)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "Occupation must contain letters only ",
        "string.empty": "Please fill in your occupation",
        "string.min": "Occupation must be at least {#limit} characters long",
        "string.max": "Occupation must be below {#limit} characters long",
        "any.required": "Occupation is required",
      }),
    gender: Joi.string()
      .valid("Male", "Female", "Prefer Not To Say")
      .required()
      .messages({
        "string.base": "Gender must contain letters only ",
        "string.empty": "Please fill in your gender",
        "any.required": "Gender is required",
      }),
    bio: Joi.string()
      .min(10)
      .max(400)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "Bio must contain letters only ",
        "string.empty": "Please fill in your bio",
        "string.min": "Bio must be at least {#limit} characters long",
        "string.max": "Bio must be below {#limit} characters long",
        "any.required": "Bio is required",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const profileUpdateValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(12)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "First name must contain letters only ",
        "string.empty": "Please fill in your first name",
        "string.min": "Fisrt name must be at least {#limit} characters long",
        "string.max": "First name must be below {#limit} characters long",
        "any.required": "Firstname is required",
      }),
    lastName: Joi.string()
      .min(3)
      .max(12)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "Last name must contain letters only ",
        "string.empty": "Please fill in your last name",
        "string.min": "Last name must be at least {#limit} characters long",
        "string.max": "Last name must be below {#limit} characters long",
        "any.required": "Lastname is required",
      }),
    username: Joi.string()
      .min(3)
      .max(12)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "Username must contain letters only ",
        "string.empty": "Please fill in your username",
        "string.min": "Username must be at least {#limit} characters long",
        "string.max": "Username must be below {#limit} characters long",
        "any.required": "Username is required",
      }),
    occupation: Joi.string()
      .min(3)
      .max(30)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "Occupation must contain letters only ",
        "string.empty": "Please fill in your occupation",
        "string.min": "Occupation must be at least {#limit} characters long",
        "string.max": "Occupation must be below {#limit} characters long",
        "any.required": "Occupation is required",
      }),
    gender: Joi.string()
      .valid("Male", "Female", "Prefer Not To Answer")
      .required()
      .messages({
        "string.base": "Gender must contain letters only ",
        "string.empty": "Please fill in your gender",
        "any.required": "Gender is required",
      }),
    bio: Joi.string()
      .min(10)
      .max(400)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        "string.base": "Bio must contain letters only ",
        "string.empty": "Please fill in your bio",
        "string.min": "Bio must be at least {#limit} characters long",
        "string.max": "Bio must be below {#limit} characters long",
        "any.required": "Bio is required",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const roleValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Please fill in your email",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
    role: Joi.string()
      .valid("basic", "admin", "superAdmin")
      .required()
      .messages({
        "string.base": "Role name must contain letters only",
        "string.empty": "Please fill in the role name",
        "any.required": "Role name is required",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Please fill in your email",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password must be string",
      "string.empty": "Please fill in your password",
      "string.min": "Password must be at least {#limit} characters long",
      "any.required": "Password is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const PassResetEmailValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Please fill in your email",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
  });
  const { error } = schema.validate(req.body || req.params);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const PassResetValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(8).required().messages({
      "string.base": "Password must be string",
      "string.empty": "Please fill in your password",
      "string.min": "Password must be at least {#limit} characters long",
      "any.required": "Password is required",
    }),
    passwordConf: Joi.string().min(8).required().messages({
      "string.base": "Password Confirmation must be string",
      "string.empty": "Please confirm your password",
      "string.min":
        "Password confirmation must be at least {#limit} characters long",
      "any.required": "Password confirmation is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const postCommentValidation = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().required().messages({
      "string.base": "Comment must contain words",
      "string.empty": "Comment can't be empty ",
      "any.required": "Comment is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const postCommentReplyValidation = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().required().messages({
      "string.base": "Reply must contain words",
      "string.empty": "Reply can't be empty ",
      "any.required": "Reply is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const postValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(15)
      .max(300)
      .regex(/[a-zA-Z0-9]/)
      .required()
      .messages({
        "string.base": "Title must contain letters and numbers only",
        "string.empty": "Please fill in the title",
        "string.min": "Title must be at least {#limit} characters long",
        "string.max": "Title must be below {#limit} characters long",
        "any.required": "Title is required",
      }),
    description: Joi.string().min(500).required().messages({
      "string.base": "Post body must contain words",
      "string.empty": "Please fill in the post body",
      "string.min": "Post body must be at least {#limit} characters long",
      "any.required": "Post body is required",
      "string.max": "Post body must be less than  {#limit} characters long",
    }),
    category: Joi.string().required().messages({
      "number.base": "Category must be  a string",
      "string.empty": "Please fill in the category",
      "any.required": "Category is required",
    }),
    img: Joi.string().required().messages({
      "string.empty": "Profile image is required",
      "any.required": "Profile image is required",
    }),
    status: Joi.string().valid("pending", "deleted", "published").messages({
      "string.base": "Post status must contain letters only ",
      "string.empty": "Please fill in the post status",
      "any.required": "Post status is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const BlogVideosValidation = (req, res, next) => {
  const schema = Joi.object({
    // author: Joi.string().messages({
    //   "string.base": "Author's name must a string",
    //   "string.empty": "Author's name is required",
    //   "string.pattern.base": "Author's name is not meaningful",
    // }),
    author: Joi.any(),
    link: Joi.string().uri().required().messages({
      "string.base": "Please provide a valid url",
      "string.empty": "Provide a video link",
      "string.uri": "Please provide a valid url",
      "any.required": "Video link is required",
    }),
    description: Joi.string()
      .regex(/[a-zA-Z0-9]/)
      .required()
      .min(20)
      .max(50)
      .messages({
        "string.base": "Provide a meaningful description",
        "string.empty": "Provide a description",
        "any.required": "Description is required",
        "string.min": "Description must at least have {#limit} characters",
        "string.max": "Description must not exceed {#limit} characters",
        "string.pattern.base": "Please provide a meaningful description",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const BlogVideosUpdateValidation = (req, res, next) => {
  const schema = Joi.object({
    author: Joi.any(),
    link: Joi.string().uri().messages({
      "string.base": "Please provide a valid url",
      "string.empty": "Provide a video link",
      "string.uri": "Please provide a valid url",
    }),
    description: Joi.string()
      .regex(/[a-zA-Z0-9]/)
      .min(20)
      .max(50)
      .messages({
        "string.base": "Provide a meaningful description",
        "string.empty": "Provide a description",
        "string.min": "Description must at least have {#limit} characters",
        "string.max": "Description must not exceed {#limit} characters",
        "string.pattern.base": "Please provide a meaningful description",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const categoryValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .regex(/[a-zA-Z0-9]/)
      .required()
      .messages({
        "string.base": "Name must be a string of characters",
        "string.empty": "Please fill in the name",
        "string.min": "Name must be at least {#limit} characters long",
        "string.max": "Name must be below {#limit} characters long",
        "any.required": "Name is required",
      }),
    description: Joi.string().min(20).max(200).required().messages({
      "string.base": "Description must contain words",
      "string.empty": "Please fill in the description",
      "string.min": "Description must be at least {#limit} characters long",
      "any.required": "Description is required",
      "string.max": "Description must be less than  {#limit} characters long",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const messageValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(12)
      .regex(/[a-zA-Z]/)
      .messages({
        "string.base": "Name must contain letters only ",
        "string.empty": "Please fill in your name",
        "string.min": "Name must be at least {#limit} characters long",
        "string.max": "Name must be below {#limit} characters long",
      }),
    email: Joi.string().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Please fill in your email",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),

    message: Joi.string()
      .regex(/[a-zA-Z0-9]/)
      .max(600)
      .required()
      .messages({
        "string.base": "Message must contain words",
        "string.empty": "Message can't be empty",
        "string.min": "Message must be at least {#limit} characters long",
        "any.required": "Message is required",
        "string.pattern.base": "Please provide a meaningful message",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const createWorkValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required().messages({
      "string.base": "Work title must contain words",
      "string.empty": "Please fill in the work title",
      "string.min": "Work title must be at least {#limit} characters long",
      "any.required": "Work title is required",
      "string.max": "Work title must be less than  {#limit} characters long",
    }),
    web_url: Joi.string().trim().uri().required().messages({
      "string.base": "Please provide a valid url",
      "string.empty": "Provide a web url",
      "string.uri": "Please provide a valid web url",
      "any.required": "Web url is required",
    }),
    codebase_backend: Joi.string().trim().uri().required().messages({
      "string.base": "Please provide a valid codebase backend url",
      "string.empty": "Provide a codebase backend url",
      "string.uri": "Please provide a valid codebase backend url",
      "any.required": "Codebase backend url is required",
    }),
    codebase_front_end: Joi.string().trim().uri().required().messages({
      "string.base": "Please provide a valid codebase frontend url",
      "string.empty": "Provide a codebase frontend url",
      "string.uri": "Please provide a valid codebase frontend url",
      "any.required": "Codebase frontend url is required",
    }),
    image: Joi.string().required().messages({
      "string.empty": "Work image is required",
      "any.required": "Work image is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const updateWorkValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required().messages({
      "string.base": "Work title must contain words",
      "string.empty": "Please fill in the work title",
      "string.min": "Worktitle must be at least {#limit} characters long",
      "any.required": "Work title is required",
      "string.max": "Work title must be less than  {#limit} characters long",
    }),
    web_url: Joi.string().trim().uri().required().messages({
      "string.base": "Please provide a valid url",
      "string.empty": "Provide a web url",
      "string.uri": "Please provide a valid web url",
      "any.required": "Web url is required",
    }),
    codebase_backend: Joi.string().trim().uri().required().messages({
      "string.base": "Please provide a valid codebase backend url",
      "string.empty": "Provide a codebase backend url",
      "string.uri": "Please provide a valid codebase backend url",
      "any.required": "Codebase backend url is required",
    }),
    codebase_front_end: Joi.string().trim().uri().required().messages({
      "string.base": "Please provide a valid codebase frontend url",
      "string.empty": "Provide a codebase frontend url",
      "string.uri": "Please provide a valid codebase frontend url",
      "any.required": "Codebase frontend url is required",
    }),
    image: Joi.string().messages({
      "string.empty": "Work image is required",
      "any.required": "Work image is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
