import { Router } from "express";
import NewsLetterController from "../../controller/subscriptions/newsLetter";
import NewsLetterMiddleware from "../../middleware/subscriptions/newsLetter";
import AuthMiddleware from "../../middleware/AuthMiddleware";

const newsLetterRoute = new Router();

newsLetterRoute.post(
  "/subscribe/:email",
  NewsLetterMiddleware.checkEmail,
  NewsLetterController.subscribe
);
newsLetterRoute.get(
  "/subscribers",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  NewsLetterController.getSubscribers
);
newsLetterRoute.get(
  "/subscriber/:email",
  AuthMiddleware.checkToken,
  AuthMiddleware.checkAdmin,
  NewsLetterController.getSubscriber
);
newsLetterRoute.post("/unsubscribe/:email", NewsLetterController.unsubscribe);
export default newsLetterRoute;
