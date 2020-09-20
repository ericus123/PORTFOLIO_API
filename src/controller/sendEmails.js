// import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";
// dotenv.config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendemailsController = async (req, res) => {
//   const msg = {
//     to: req.body.to,
//     from: process.env.SENDER_EMAIL,
//     subject: req.body.subject,
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error.response.body);
//     });
// };
// export default sendemailsController;
