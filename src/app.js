import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import messageRoute from "./routes/messages";
import bodyParser from "body-parser";

//express app

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

//connect to dba
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db!")
);

//Middleware

app.use(express.json());
//route Middlewares

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/", (req, res) => {
  res.status(200).send({ message: "Hello ! Welcome on our website " });
});
export default app;
