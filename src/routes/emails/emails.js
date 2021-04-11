import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import NewsLetterMiddleware from "../../middleware/subscriptions/newsLetter";
import EmailController from "../../controller/emails/index"
import { validateEmail, validateEmails } from "../../middleware/validation"

const emailRoute = new Router();

emailRoute.post("/", AuthMiddleware.checkToken, AuthMiddleware.checkSuperAdmin, validateEmail, NewsLetterMiddleware.checkEmail, EmailController.sendEmail);

emailRoute.post("/multiple", AuthMiddleware.checkToken, AuthMiddleware.checkSuperAdmin, validateEmails, EmailController.sendEmails);

export default emailRoute;