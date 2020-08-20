const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const { registerValidation, loginValidation } = require("../validation");
router.post("/register", async (req, res) => {
  //Check if a user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");
  //VALIDATE THE DATA BEFORE WE MAKE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Hash the passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    bio: req.body.bio,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//update user info

router.put("/update/:id", async (req, res) => {
  //Check if a  name is already in the database
  const nameExists = await User.findOne({ name: req.body.name });
  if (nameExists) return res.status(400).send("Name already exists");

  //Check if a user email is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      //Hash the passwords
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    if (req.body.bio) {
      user.bio = req.body.bio;
    }
    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "Ooops!!!! User doesn't exist!" });
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  //create and assign a token
  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token);

  res.send("Welcome! You are now logged in");
});
module.exports = router;
