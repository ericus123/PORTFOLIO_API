import User from "../../model/User";
import PassResetToken from "../../model/PassResetToken";
import VerToken from "../../model/VerificationToken";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { sendEmail, setEmail } from "../../helpers/emails";
import { confirmEmail, resetPassword } from "../../helpers/emails/templates";
import { generateToken } from "../../helpers/tokens";

dotenv.config();

class AuthController {
  static async Login(req, res) {
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
    if (!user.isVerified)
      return res
        .status(400)
        .json({ error: "Your account has not been verified" });
    //create and assign a token

    const data = {
      role: login.role,
      id: login._id,
      username: login.username,
      email: login.email,
      firstName: login.firstName,
      lastName: login.lastName,
      avatar: login.avatar,
      isComplete:login.isComplete,
      avatar_public_id: login.avatar_public_id
    }

    const token =  await
      generateToken(data,"2h");
    
    return res.status(200).json({
      msg: "logged in successfuly",
      token: token,
    });
  }
  static async Signup(req, res) {
    if (req.body.confPassword != req.body.password)
      return res.status(400).json({ error: "Passwords do not match" });
    try {
      const { username, firstName, lastName, email, password } = req.body;
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists)
        return res.status(400).json({ error: "Email already exists" });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });

      await user.save();
      const token =  await
      generateToken({email:user.email},"5m");
    
      const url = `${process.env.FRONTEND_URL}/account/verify/${user.email}/${token}`;
      const name = firstName;
      await sendEmail(
        setEmail(
          process.env.EMAIL,
          user.email,
          "Confirm Email",
          confirmEmail({ name, url })
        )
      ).then((result) => {
        return res.status(200).json({
          msg: `Verification email has been sent to ${email}. It expires in 5 mins`,
          email: email,
          token: token,
        });
      }).catch((error) => {
        return res.status(500).json({
          msg: err.message,
          error: "Can't send verification email, try again",
          err: error
        });
      });
    } catch (error) {
      return res
        .status(400)
        .json({ err: error, error: "Something went wrong" });
    }
  }

  static async ConfEmail(req, res) {
    try {
      
      const {email} = req.token;
      
      if(!req.user.email == email){
        return res.status(401).json({error:"Unauthorized request"});
      }
      req.user.isVerified = true;
      await req.user.save();
      return res.status(201).json({
        msg: "Your account is verified now, please login!",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong, try again", err: error });
    }
  }
  static async ResendConfEmail(req, res) {
    try {
      const user = req.user;
      const { firstName, email } = user;
      const token =  await
      generateToken({email:user.email},"5m");
     
      const url = `${process.env.FRONTEND_URL}/account/verify/${user.email}/${token.token}`;
      const name = firstName;
      await sendEmail(
        setEmail(
          process.env.EMAIL,
          user.email,
          "Confirm Email",
          confirmEmail({ name, url })
        )
      ).then((result) => {
        return res.status(200).json({
          msg: `Verification email has been sent to ${email}. It expires in 5 mins`,
          email: email,
          token: token,
        });
      }).catch((error) => {
        return res.status(500).json({
          msg: err.message,
          error: "Can't send verification email, try again",
          err: error
        });
      });
    } catch (error) {
      return res.status(500).json({ err: error, msg: "Something went wrong" });
    }
  }
  static async SendPassResetLink(req, res) {
    try {
      const user = req.user;
      const token =  await
      generateToken({email:user.email},"5m");

      const { firstName, email } = user;
      const url = `${process.env.FRONTEND_URL}/password/reset/${email}/${token}`;
      await sendEmail(
        setEmail(
          process.env.EMAIL,
          user.email,
          "Reset Password",
          resetPassword({ firstName, url })
        )
      ).then((result) => {
        return res.status(200).json({
          msg: `Password reset link has been sent to ${email}. It expires in 5 mins`,
          email: email,
          token: token,
        });
      }).catch((error) => {
        return res.status(500).json({
          msg: err.message,
          error: "Can't send password reset email, try again",
          err: error
        });
      })
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async ResetPassword(req, res) {
    try {
      const { email } = req.token;
      if(req.user.email !== email){
        return res.status(401).json({error:"Unauthorized request"});
      }
      const { password, passwordConf } = req.body;

      if (password !== passwordConf) {
        return res.status(400).json({ error: "Passwords doesn't match" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await req.user.updateOne({ $set: { password: hashedPassword } });
      return res.status(201).json({ msg: "Password reset successfuly" });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async CheckLogin(req, res) {
    const user = await User.findOne({_id:req.user.id});
    if(!user){
      return res.status(404).json("User not found");
    }
    const userData = {
      role: user.role,
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
    }
    return res.status(200).json({ msg: "User is logged in", user: userData });
  }
  static async changePassword(req,res){
    try{
      const {id} = req.user;
      const {password, passwordConf} = req.body;
      if(password !== passwordConf){
        return res.status(400).json({error:"Passwords do not match"})
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(
        id,
        {
          $set:{
            password:hashedPassword
          }
        },
        {useFindAndModify:false}
      );
      return res.status(201).json({msg:"Password changed successfully"});
    }catch(error){
    return res.status(500).json({error:"Something went wrong", err:error})
    }
  }
}

export default AuthController;
