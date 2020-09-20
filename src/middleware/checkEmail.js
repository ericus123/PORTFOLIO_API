var emailCheck = require('email-check');
 
const checkemailExistence = async (req,res,next) => {

await emailCheck(`${req.body.email}`)
  .then(function (response) {
      if (response == true) {
         res.status(200); next()
      }else{
         res.status(400).json({error:"this email doen't work! use active email"})
      }
  })
  .catch(function (err) {
    if (err) {
      res.status(400).json({error:`can't connect with ${req.body.email}`})
    }
  })

}

export default checkemailExistence