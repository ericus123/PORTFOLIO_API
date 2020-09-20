import User from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    bio: req.body.bio,
    isAdmin: 0,
    isVerified:false
  });
  //Check if email exists
  const unVerifieduser = await User.findOne({ email: req.body.email });
  if (unVerifieduser) {
      const verifyToken = await jwt.sign({
    email: req.body.email},
    process.env.VERIFY_TOKEN_SECRET
  );
  }

//   try {
//     const savedUser = await user.save();
//     const registeredUser = {
//       username: savedUser.username,
//       email: savedUser.email,
//       bio: savedUser.bio,
//     };
//     console.log(req.body);
//     res.send(registeredUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
//   const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const msg = {
//   to: '', // Change to your recipient
//   from: process.env.SENDER_EMAIL,
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.log(error.response.body);
//   })
};



//express app

export default signupController;
