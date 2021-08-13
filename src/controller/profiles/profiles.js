import User from "../../model/User";
import dotenv from "dotenv";
import { uploadImage, deleteImage } from "../../helpers/images/index";
import { generateToken } from "../../helpers/tokens";
import { sendEmail, setEmail } from "../../helpers/emails";
import { accountDeletion } from "../../helpers/emails/templates";
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
      const { username, bio, firstName, lastName, occupation, gender } = req.body;

      await user.updateOne({
        $set: {
          username: username,
          bio: bio,
          firstName: firstName,
          lastName: lastName,
          occupation: occupation,
          gender: gender
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
      const user = await User.findOne({
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
      const { bio, img , occupation, gender } = req.body;
      const updatedUser = await req.profile.updateOne({
        $set: {
          bio: bio,
          occupation: occupation,
          gender: gender,
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

   static async genAcctDelToken(req,res){
  
      try{
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ error: "User not found" });
        const token =  await
          generateToken({email:user.email},"5m");
          const url = `${process.env.FRONTEND_URL}/account/delete/${token}`;
          const {firstName} = req.user;
          await sendEmail(
            setEmail(
              process.env.EMAIL,
              user.email,
              " Delete Account",
              accountDeletion(firstName, url )
            )
          ).then((result) => {         
              return res.status(201).json({msg:`An account deletion email has been sent to ${req.user.email} and it expires in 5 mins . Open that link to delete your account .`});         
          }).catch((error) => {
            return res.status(500).json({
              msg: err.message,
              error: "Can't send email, try again",
              err: error
            });
          });
        
      }catch(error){
        return res.status(500).json({ error: "Something went wrong", err: error })
      }
  }
  
  static async deleteAccount(req, res) {
    try {
       const {email} = req.token;
      if(req.user.email !== email){
        return res.status(401).json({error:"Unauthorized request"});
      }
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(404).json({ error: "User not found" });

      if(user.isComplete){
         await deleteImage(req.user.avatar_public_id);
      }
      await user.delete();  
      return res.status(201).json({ msg: "Account deleted successfuly" });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong", err: error })
    }
  }
  static async changeProfileImage(req,res){
    try{
      const {image} = req.body;
      
      const user = await User.findOne({ _id:req.user.id });
      if(!user){
        return res.status(404).json({error:"User not found"});
      }
      const {avatar_public_id} = user;
      const uploaded_image = await uploadImage(image, "/Users/Avatars");

      avatar_public_id ? await deleteImage(avatar_public_id) : null
      
      user.avatar = uploaded_image.secure_url;
      user.avatar_public_id = uploaded_image.public_id;
      await user.save();
    return res.status(201).json({msg:"Profile image changed successfully", url: uploaded_image.secure_url});
  }catch(error){
  return res.status(500).json({error:"Something went wrong", err:error})
  }
 }
}
export default ProfileController;
