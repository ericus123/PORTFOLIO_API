const router = require("express").Router();
const mongoose = require("mongoose");
const Message = require("../model/Message");
const { messageValidation } = require("../validation");
const verify = require("./verifyToken");
router.post("/create", async (req, res) => {
  //VALIDATE THE DATA BEFORE CREATING  A MESSAGE
  const { error } = messageValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
});

//Get messages form db

router.get("/get", verify, (req, res) => {
  Message.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// //Delete a message

router.delete("/delete/:id", verify, async (req, res) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });

    await message.deleteOne();
    res.send("Message deleted successfully !");
  } catch {
    res.status(404);
    res.send({ error: "Ooops!!!! Message doesn't exist!" });
  }
});
module.exports = router;
