import Message from "../../model/Message";
import dotenv from "dotenv";
dotenv.config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const messagesController = async (req, res) => {
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
const getmessagesController = (req, res) => {
  Message.find({}, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(400).json({ messages: result });
    }
  });
};

const deletemsgController = async (req, res) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });

    await message.deleteOne();
    res.send({ message: "Message successfully deleted!" });
  } catch {
    res.status(404);
    res.send({ error: "Message with id=" + req.params.id + "is not found " });
  }
};

export { messagesController, deletemsgController, getmessagesController };
