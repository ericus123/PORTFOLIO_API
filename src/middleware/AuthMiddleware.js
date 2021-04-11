import jwt from "jsonwebtoken";
import User from "../model/User";

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
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user.isVerified)
      return res
        .status(400)
        .json({ error: "Your account is already verified, please login!" });
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
}
export default AuthMiddleware;
