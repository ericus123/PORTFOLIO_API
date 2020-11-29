import User from "../../model/User";
class UsersController {
  static async getAllUsers(req, res) {
    const users = await User.find({});
    if (!users) return res.status(400).json({ error: "can't find all users" });
    return res.status(200).json({ users });
  }
  static async deleteAllUsers(req, res) {
    const users = await User.find({});
    if (!users) return res.status(400).json({ error: "can't find all users" });
    await User.deleteMany({});
    return res
      .status(200)
      .json({ msg: "users deleted successfully", users: users });
  }
  static async deleteUser(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "can't find user" });
    await user.delete();
    return res
      .status(201)
      .json({ msg: "user deleted successfuly", user: user });
  }
  static async getUser(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "can't find user" });
    return res.status(200).json({ user: user });
  }
}

export default UsersController;
