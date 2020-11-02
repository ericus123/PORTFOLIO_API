import { Router } from "express";
import { messageValidation } from "../middleware/validation";
import verify from "../middleware/verifyToken";

import {
  messagesController,
  deletemsgController,
  getmessagesController,
} from "../controller/messages";

const messageRoute = new Router();
//create messages
messageRoute.post("/", messageValidation,messagesController);

//Get messages form db

messageRoute.get("/", verify, getmessagesController);
//Delete a message

messageRoute.delete("/:id", verify, deletemsgController);

export default messageRoute;
