const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const updateuserController = async (req, res, next) => {
  const id = req.params.id;
  //Check if a  name is already in the database
  const nameExists = await User.findOne({ name: req.body.name });
  if (nameExists) return res.status(400).send("Name already exists ");

  //Check if a user email is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  try {
    const user = await User.findOne({ _id: id });

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
    res.send({
      error: "Ooops!!!! User with id=" + id + " doesn't exist!",
    });
  }
};

module.exports = updateuserController;
