import User from "../../model/User";
import dotenv from "dotenv";
import { uploadImage, deleteImage } from "../../helpers/images/index"
dotenv.config();


class ProfileController {
  static async updateProfile(req, res) {
    const id = req.user.id;

    try {
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(404).json({ error: "User not found" });
      if (!user.isComplete) {
        return res
          .status(400)
          .json({ error: "Please complete your profile first" });
      }
      const { username, bio, firstName, lastName, img } = req.body;
      const uploaded_image = await uploadImage(img, "/Users/Avatars");
      await deleteImage(user.avatar_public_id);
      await user.updateOne({
        $set: {
          username: username,
          bio: bio,
          firstName: firstName,
          lastName: lastName,
          avatar: uploaded_image.secure_url,
          avatar_public_id: uploaded_image.public_id
        },
      });
      const updatedUser = await User.find({ email: req.user.email });
      return res
        .status(201)
        .json({ msg: "Profile updated successfuly", user: updatedUser });
    } catch (error) {
      return res.status(400).json({
        error: "Failed to update profile", err: error
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
    } catch (error) {
      return res.status(400).json({
        error: "Something went wrong, try again",
      });
    }
  }
  static async completeProfile(req, res) {
    try {
      const { bio, img } = req.body;
      const uploaded_image = await uploadImage(img, "/Users/Avatars")
      const updatedUser = await req.profile.updateOne({
        $set: {
          bio: bio,
          avatar: uploaded_image.secure_url,
          avatar_public_id: uploaded_image.public_id,
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
    try {
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(404).json({ error: "User not found" });
      await user.delete();
      await deleteImage(user.avatar_public_id);
      return res.status(201).json({ msg: "Account deleted successfuly" });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong", err: error })
    }
  }
}
export default ProfileController;
