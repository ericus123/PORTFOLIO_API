import User from "../../model/User";
class UsersController {
  static async getAllUsers(req, res) {
    const users = await User.find({});
    return res.status(200).json({ users: users });
  }
  static async deleteAllUsers(req, res) {
    const users = await User.find({});
    await User.deleteMany({});
    return res
      .status(200)
      .json({ msg: "Users deleted successfully", users: users });
  }
  static async deleteUser(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.delete();
    return res
      .status(201)
      .json({ msg: "User deleted successfuly", user: user });
  }
  static async getUser(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "User not found" });
    return res.status(200).json({ user: user });
  }
}

export default UsersController;
