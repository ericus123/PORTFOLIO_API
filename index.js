const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//express app

const app = express();

dotenv.config();

//import routes

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const createpostRoute = require("./routes/createPost");

//connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db!")
);

//Middleware

app.use(express.json());
//route Middlewares

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/createPost", createpostRoute);

//Listen for requests

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is listening on port 3000");
  }
});
