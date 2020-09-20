import { Router } from "express";
import sendemailsController from "../controller/sendEmails";
const emailRoute = new Router();
emailRoute.post("/send", sendemailsController);
export default emailRoute;
