import Message from "../model/Message";

const messagesController = async (req, res) => {
  //Create a new message
  const message = new Message({
    username: req.body.username,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  try {
    const savedMessage = await message.save();
    res.send(savedMessage);
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
