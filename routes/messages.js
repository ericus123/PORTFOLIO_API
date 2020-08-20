const router = require("express").Router();
const Message = require("../model/Message");
const { messageValidation } = require("../middleware/validation");
const verify = require("../middleware/verifyToken");
const {
  messagesController,
  deletemsgController,
  getmessagesController,
} = require("../controller/messages");

//create messages
router.post("/create", messageValidation, messagesController);

//Get messages form db

router.get("/get", getmessagesController);
//Delete a message

router.delete("/delete/:id", verify, deletemsgController);
module.exports = router;
