import Message from "../../model/Message";
import dotenv from "dotenv";
dotenv.config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


class messagesController {
  static async sendMessage(req, res){
    const message = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    try {
      const savedMessage = await message.save();
      res
        .status(200)
        .json({ msg: savedMessage, success: "Thanks for contacting us!" });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  };
  static async getMessages (req, res){
    try {
      const messages =  await Message.find();
      return res.status(200).json({msg:"Messages fetched successfuly", messages})
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };
  
  static async deleteMessage(req, res){
    try {
      const message = await Message.findOne({ _id: req.params.id });
      await message.deleteOne();
      res.send({ message: "Message successfully deleted!" });
    } catch {
      res.status(404);
      res.send({ error: "Message with id=" + req.params.id + "is not found " });
    }
  };
  
}


export default messagesController;