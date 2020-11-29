const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const confirmEmail = async (email, token, subject) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: `${process.env.SENDER_EMAIL}`, // Change to your verified sender
    subject: `${subject}`,
    text:
      "Hello,\n\n" +
      "Please verify your account by clicking the link: \nhttp://www.amaniericus.com/confirmation/" +
      token +
      ".\n",
  };

  await sgMail
    .send(msg)
    .then(() => {
      res
        .status(201)
        .json({ msg: `Confirmation email has been sent to ${email}` });
    })
    .catch((error) => {
      res.status(400).json({ error: error, msg: "error occured" });
    });
};
