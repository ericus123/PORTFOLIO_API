require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
});
let accessToken;
const setAccessToken = async () => {
  try {
    accessToken = await oAuth2Client.getAccessToken();
  } catch (error) {
    return res.status(500).json({ error: "Connection error" })
  }

};
setAccessToken();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.Email,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});
export const setEmail = (sender, receiver, subject, template) => {
  let mail = {
    from: sender,
    to: receiver,
    subject: subject,
    html: template,
  };
  return mail;
};

export const sendEmails = async (emails, options) => {
  try {
    const mails = await emails.map((email) => {
      options.to = email;
      transport.sendMail(options);
    })
  } catch (error) {
    return error;
  }
};

export const sendEmail = async (options) => {
  try {
    const email = await transport.sendMail(options);
    return email;
  } catch (error) {
    return error;
  }
};
