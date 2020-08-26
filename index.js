import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import messageRoute from "./routes/messages";
//express app

const app = express();

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

//Listen for requests
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is listening on port 3000");
  }
});
