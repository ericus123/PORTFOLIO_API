import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./src/routes/users";
import authRoute from "./src/routes/auth";
import postRoute from "./src/routes/posts";
import messageRoute from "./src/routes/messages";
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
app.use("/", (req, res) => {
  res.status(200).send({ message: "Hello ! Welcome on our website " });
});
export default app;

//Listen for requests
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is listening on port ");
  }
});
