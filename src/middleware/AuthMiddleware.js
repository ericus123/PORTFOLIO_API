import jwt from "jsonwebtoken";
import User from "../model/User";
import validate from 'deep-email-validator'

class AuthMiddleware {
  static async checkToken(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({ error: "Please login!" });
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send({ error: "Invalid Token" });
    }
  }
  static async checkAdmin(req, res, next) {
    if (req.user.role === "admin" || req.user.role === "superAdmin") {
      return next();
    } else {
      return res.status(401).json({ error: "Access denied" });
    }
  }
  static async checkSuperAdmin(req, res, next) {
    if (req.user.role != "superAdmin")
      return res.status(401).json({ error: "Access denied" });
    next();
  }

  static async isNotVerified(req, res, next) {
    const email = req.body.email ? req.body.email : req.params.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    if (user.isVerified) {
      return res
        .status(400)
        .json({ error: "Your account is already verified, please login!" });
    }
    req.user = user;
    next();
  }
  static async isVerified(req, res, next) {
    const email = req.body.email ? req.body.email : req.params.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ error: "Your account is not verified" });
    }
    req.user = user;
    next();
  }
  static async profileIsIncomplete(req, res, next) {
    const { id } = req.user;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.isComplete) {
      return res
        .status(400)
        .json({ error: "Your profile is already complete" });
    }
    req.profile = user;
    next();
  }
  static async checkEmail(req, res, next) {
    const email = req.body.email ? req.body.email : req.params.email;
    const { valid } = validate(email);
    if (!valid) {
      return res.status(400).json({ error: "Email is invalid" });
    }
    next();
  }
}
export default AuthMiddleware;
