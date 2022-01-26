import Message from "../../model/Message";
import dotenv from "dotenv";
import { sendEmail, setEmail } from "../../helpers/emails";
import { contactMessage } from "../../helpers/emails/templates";
dotenv.config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class messagesController {
  static async sendMessage(req, res) {
    try {
      const { name, message, email } = req.body;
      const new_message = new Message({
        name,
        email,
        message,
      });
      const savedMessage = await new_message.save();
      await sendEmail(
        setEmail(
          process.env.EMAIL,
          process.env.WEB_EMAIL,
          "New Message",
          contactMessage({ name, message, email })
        )
      );
      res.status(200).json({ success: "Thanks for contacting us!" });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
  static async getMessages(req, res) {
    try {
      const messages = await Message.find();
      return res
        .status(200)
        .json({ msg: "Messages fetched successfuly", messages });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async deleteMessage(req, res) {
    try {
      const message = await Message.findOne({ _id: req.params.id });
      await message.deleteOne();
      res.send({ message: "Message successfully deleted!" });
    } catch {
      res.status(404);
      res.send({ error: "Message with id=" + req.params.id + "is not found " });
    }
  }
}

export default messagesController;
