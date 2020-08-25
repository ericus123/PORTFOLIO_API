const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const updateuserController = async (req, res, next) => {
  const id = req.user._id;

  //Check if a user email is already in the database
  // const emailExists = await User.findOne({ email: req.body.email });
  // if (emailExists)
  // return res.status(400).send({ error: "Email already exists" });
  // const user = await User.findOne({ id });
  // //Hash the passwords
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const updateduser = await User.updateOne(
      { id },
      { $set: { username: req.body.username, email: req.body.email } }
    );

    res.send(updateduser);
  } catch {
    res.status(404);
    res.send({
      error: "Ooops!!!! User with id doesn't exist!",
    });
  }
};

module.exports = updateuserController;
