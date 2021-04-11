import validate from "deep-email-validator";
class NewsLetterMiddleware {
  static async checkEmail(req, res, next) {
    const email = req.body.email ? req.body.email : req.params.email;
    if (!email || !email.length) {
      return res.status(400).json({ error: "Email is required" });
    }
    const { valid } = await validate({
      email: email,
      sender: process.env.EMAIL,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: true,
    });
    if (!valid) {
      return res.status(400).json({ error: "Email is invalid", email: email });
    }
    next();
  }
}

export default NewsLetterMiddleware;
