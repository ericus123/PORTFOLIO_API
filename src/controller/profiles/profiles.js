import User from "../../model/User";
import dotenv from "dotenv";
var cloudinary = require("cloudinary").v2;
dotenv.config();

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
      if (!user) return res.status(404).json({ error: "User not found" });
      if (!user.isComplete) {
        return res
          .status(400)
          .json({ error: "Please complete your profile first" });
      }
      await user.updateOne({
        $set: {
          username: req.body.username,
          bio: req.body.bio,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          imageUrl: req.body.imageUrl,
        },
      });
      const updatedUser = await User.find({ email: req.user.email });
      return res
        .status(201)
        .json({ msg: "User updated successfuly", user: updatedUser });
    } catch {
      return res.status(400).json({
        error: "Failed to update profile",
      });
    }
  }
  static async viewProfile(req, res) {
    try {
      const user = await User.find({
        email: req.user.email,
      }).populate("posts");
      if (!user) return res.status(404).json({ error: "Profile not found" });
      return res.status(200).json({ profile: user });
    } catch {
      return res.status(400).json({
        error: "Something went wrong, try again",
      });
    }
  }
  static async completeProfile(req, res) {
    try {
      const fileStr = req.body.img;
      const uploadResponse = await cloudinary.uploader.upload(fileStr);
      const updatedUser = await req.profile.updateOne({
        $set: {
          bio: req.body.bio,
          imageUrl: uploadResponse.url,
          isComplete: true,
        },
      });
      return res.status(201).json({ msg: "Profile completed successfuly" });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async deleteAccount(req, res) {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.delete();
    return res.status(201).json({ msg: "Account deleted successfuly" });
  }
}
export default ProfileController;
