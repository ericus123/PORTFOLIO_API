import User from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  //Check credentials
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Incorrect credentials" });
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ error: "Incorrect credentials" });

  const login = await User.findOne({
    email: req.body.email,
    password: user.password,
  });

  if (!login) return res.status(400).json({ error: "Incorrect credentials" });

  //create and assign a token
  const token = jwt.sign(
    {
      user,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token);
  res.status(200).json({
    msg: "logged in successfuly",
    token: token,
  });
};

export default loginController;
