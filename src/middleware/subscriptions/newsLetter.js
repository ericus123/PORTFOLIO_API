import emailCheck from "email-check";

class NewsLetterMiddleware {
  static async checkEmail(req, res, next) {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Please fill in your email" });
    }
    // Quick version
    await emailCheck(email)
      .then(function (res) {
        if (true) {
          next();
        }
        res.status(400).json({ error: "Email doesn't exist" });
      })
      .catch(function (err) {
        if (err.message === "refuse") {
          // The MX server is refusing requests from your IP address.
          res.status(500).json({ error: "Server error, try again!" });
        } else {
          // Decide what to do with other errors.
          res.status(400).json({ error: "Something went wrong", err: error });
        }
      });
  }
}

export default NewsLetterMiddleware;
