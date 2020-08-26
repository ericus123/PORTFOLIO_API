import User from "../model/User";
import bcrypt from "bcryptjs";

const signupController = async (req, res) => {
  //Check if a user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).send({ error: "Email already exists" });

  //Hash the passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    username: req.body.name,
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
};

export default signupController;
