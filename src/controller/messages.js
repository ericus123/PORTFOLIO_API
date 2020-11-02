import Message from "../model/Message";
import dotenv from 'dotenv'
dotenv.config()
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const messagesController = async (req, res) => {
  //Create a new message
  const message = new Message({
    names: req.body.names,
    email: req.body.email,
    country: req.body.country,
    message: req.body.message,
  });
  try {
     
const msg = {
  to: 'amaniericus@gmail.com', // Change to your recipient
  from: process.env.SENDER_EMAIL, // Change to your verified sender
  subject: 'Contact Form',
      html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div>
    <h1><b>names:</b> ${req.body.names}</h1><br>
    <h1><b>email:</b> ${req.body.email}</h1><br>
    <h1><b>country:</b> ${req.body.country}</h1><br>
    <p><b>message:</b> ${req.body.message}</p>
 </div>   
</body>
</html>`
}
await sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error.response.body)
  })
    const savedMessage = await message.save();
    res.send({ msg: savedMessage, success: "Message sent!" });
  } catch (err) {
    res.status(400).send(err);
  }
};
const getmessagesController = (req, res) => {
  Message.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ messages: result });
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



