const verify = require("../middleware/verifyToken");
const Message = require("../model/Message");

const messagesController = async (req, res) => {
  //Create a new message
  const message = new Message({
    names: req.body.names,
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
      res.send(result);
    }
  });
};

const deletemsgController = async (req, res) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });

    await message.deleteOne();
    res.send("Message deleted successfully !");
  } catch {
    res.status(404);
    res.send({ error: "Not found message with id=" + req.params.id });
  }
};

module.exports.messagesController = messagesController;
module.exports.deletemsgController = deletemsgController;
module.exports.getmessagesController = getmessagesController;
