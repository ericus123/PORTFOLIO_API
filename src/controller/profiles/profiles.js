import User from "../../model/User";
import dotenv from "dotenv";
var cloudinary = require("cloudinary").v2;
dotenv.config()

var uploads = {};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ProfileController {
  static async updateUser(req, res) {
    const id = req.user.id;
    //Check if a user email is already in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
      return res.status(400).json({ error: "Email already exists" });

    try {
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(400).json({ error: "can't update user" });

      await user.updateOne({
        $set: {
          username: req.body.username,
          bio: req.body.bio,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      });
      const updatedUser = await User.find({ email: req.user.email });
      res
        .status(201)
        .json({ msg: "user updated successfuly", user: updatedUser });
    } catch {
      res.status(400).json({
        error: "failed to update profile",
      });
    }
  }
  static async viewProfile(req, res) {
    try {
      const user = await User.find({
        email: req.user.email,
      }).populate("posts");
      if (!user) return res.status(400).json({ error: "cant't find user" });
      res.status(200).json({ profile: user });
    } catch {
      res.status(400).json({
        error: "error retrieving user",
      });
    }
  }
  static async completeProfile(req,res){
    try {
      const user = await User.findOne({_id:req.user.id})
      if(!user){
        res.status(400).json({error:"User doesn't exist"})
      }
      if(user.imageUrl != null && user.bio != null ){
        res.status(400).json({error:"Your profile is already complete"})
      }
         const fileStr = req.body.img;
      const uploadResponse = await cloudinary.uploader.upload(fileStr);
    const  updatedUser =  await user.updateOne({$set:{
           bio: req.body.bio,
        imageUrl: uploadResponse.url,
         }})
        res.status(201).json({msg:"Profile completed successfuly" })
    } catch (error) {
      res.status(400).json({error:"Error occured", err: error})
    }
  }
  static async deleteAccount(req, res) {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(400).json({ error: "can't find user" });
    await user.delete();
    res.status(201).json({ msg: "account deleted successfuly" });
  }
}
export default ProfileController;
