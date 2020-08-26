import User from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const updateuserController = async (req, res) => {
//   const id = req.user.id;
//   const user = await User.findOne({ _id: id });

//   //Check if a user email is already in the database
//   const emailExists = await User.findOne({ email: req.body.email });
//   if (emailExists) return res.status(400).send("Email already exists");
//   //Hash the passwords
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   user.password = hashedPassword;

//   User.findOneAndUpdate({ _id: id }, req.body, { new: true })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: "no user found",
//         });
//       }
//       res.status(200).send(user);
//     })
//     .catch((err) => {
//       return res.status(404).send({
//         message: "error while updating the post",
//       });
//     });
// };
const updateuserController = async (req, res, next) => {
  const id = req.user.id;
  //Check if a user email is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  try {
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).json({ error: "user not found" });

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
      error: "error retrieving user",
    });
  }
};

export default updateuserController;
