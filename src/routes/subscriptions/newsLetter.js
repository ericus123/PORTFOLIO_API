import { Router } from "express";
import NewsLetterController from "../../controller/subscriptions/newsLetter";
import NewsLetterMiddleware from "../../middleware/subscriptions/newsLetter";

const newsLetterRoute = new Router();

newsLetterRoute.post(
  "/subscribe",
  NewsLetterMiddleware.checkEmail,
  NewsLetterController.subscribe
);
newsLetterRoute.post("/unsubscribe/:email", NewsLetterController.unsubscribe);
export default newsLetterRoute;
