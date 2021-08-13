import validate from "deep-email-validator";
class NewsLetterMiddleware {
  static async checkEmail(req, res, next) {
    const email = req.body.email ? req.body.email : req.params.email;
    const { valid } = await validate(email);
    if (!valid) {
      return res.status(400).json({ error: "Email is invalid", email: email });
    }
    next();
  }
}

export default NewsLetterMiddleware;
