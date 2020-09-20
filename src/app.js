import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users";
import emailRoute from "./routes/emails";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import messageRoute from "./routes/messages";
import bodyParser from "body-parser";
import webpush from "web-push";
import path from "path";
dotenv.config();

//express app

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BBhvrQgpjqhPR-jX2vK-yn4GOZXCesj7f7W9kfrHbGzevQtgjZR5LflI-Gs4tnY32_mjKsR9lp2gpIwLPXbPDxU";

const privateVapidKey = "4O98d6UqiT5sb5yUXNDVbtz2b_0-nM5LQJERezhU5Hw";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use("/api/email", emailRoute);
// app.use("/", (req, res) => {
//   res.status(200).send({ message: "Hello ! Welcome on our website " });
// });

var emailCheck = require("email-check");

// Quick version
emailCheck("amaneriicus@gmail.com", { timeout: 10000 })
  .then(function (res) {
    console.log(res);
    // Returns "true" if the email address exists, "false" if it doesn't.
  })
  .catch(function (err) {
    if (err.message === "refuse") {
      console.log(err);
      // The MX server is refusing requests from your IP address.
    } else {
      // Decide what to do with other errors.
    }
  });

export default app;
