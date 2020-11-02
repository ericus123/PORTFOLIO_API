const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const messageEmail = (req,res,next) => {
const msg = {
  to: 'amaniericus@gmail.com', // Change to your recipient
  from: req.body.email, // Change to your verified sender
  subject: 'Contact Form',
  names: req.body.names,
  country: req.body.country,
  message: req.body.message,
}
}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

  export default sendMail