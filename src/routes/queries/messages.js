import { Router } from "express";
import { messageValidation } from "../../middleware/validation";
import messagesController from "../../controller/queries/messages";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import NewsLetterMiddleware from "../../middleware/subscriptions/newsLetter";

const messageRoute = new Router();
//create messages
messageRoute.post("/", messageValidation, NewsLetterMiddleware.checkEmail, messagesController.sendMessage);

//Get messages form db

messageRoute.get("/", AuthMiddleware.checkToken, AuthMiddleware.checkSuperAdmin, messagesController.getMessages);
//Delete a message

messageRoute.delete("/:id",  AuthMiddleware.checkToken, AuthMiddleware.checkSuperAdmin, messagesController.deleteMessage);

export default messageRoute;
