import User from "../model/User";
import bcrypt from "bcryptjs";
const signupController = async (req, res) => {
  //Check if a user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  //Hash the passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    bio: req.body.bio,
  });

  try {
    const savedUser = await user.save();
    const registeredUser = {
      username: savedUser.username,
      email: savedUser.email,
      bio: savedUser.bio,
    };
    res.status(201).json({ registeredUser });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

//express app

export default signupController;
