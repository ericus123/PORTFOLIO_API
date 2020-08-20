const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginController = async (req, res) => {
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

  res.send("Welcome " + user.name + "!" + "  You are now logged in");
};

module.exports = loginController;
