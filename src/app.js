import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users/users";
import profileRoute from "./routes/profile/profile";
import roleRoute from "./routes/roles/roles";
import authRoute from "./routes/auth/auth";
import emailRoute from "./routes/emails/emails";
import postRoute from "./routes/blog/posts";
import newsLetterRoute from "./routes/subscriptions/newsLetter";
import blogVideosRoute from "./routes/blog/videos";
import messageRoute from "./routes/queries/messages";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import cloudinary from "cloudinary";

//express app

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//cloudinary

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db!")
);

//Middleware

app.use(express.json());
//route Middlewares

//CORS middleware
var corsMiddleware = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //replace localhost with actual host
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "*");

  next();
};

app.use(corsMiddleware);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/roles", roleRoute);
app.use("/api/profile", profileRoute);
app.use("/api/subscriptions/newsletter", newsLetterRoute);
app.use("/api/posts", postRoute);
app.use("/api/blog", blogVideosRoute);
app.use("/api/emails", emailRoute);
app.use("/api/messages", messageRoute);
app.use("/", (req, res) => {
  res.status(200).json({ message: "Hello ! Welcome on our website " });
});
app.use((req, res, next) => {
  res.status(404).json({ error: "wrong route" });
  next();
});

export default app;
