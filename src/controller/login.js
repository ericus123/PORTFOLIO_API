import User from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  //Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ error: "Invalid password" });
  //create and assign a token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token);
  const loggedinUser = {
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  res.send({
    token: token,
    user: loggedinUser,
  });
  console.log(res.body);
};

export default loginController;
