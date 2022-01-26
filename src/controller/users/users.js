import User from "../../model/User";
class UsersController {
  static async getAllUsers(req, res) {
    const users = await User.find({});
    return res.status(200).json({ users: users });
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).json({ error: "User not found" });
      if (user.status === "deleted") {
        return res.status(400).json({ msg: "User is already deleted" });
      }
      user.status = "deleted";
      await user.save();
      return res.status(201).json({ msg: "User deleted successfuly" });
    } catch (error) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  }

  static async activateUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).json({ error: "User not found" });
      if (user.status === "active") {
        return res.status(400).json({ msg: "User is already active" });
      }
      user.status = "active";
      await user.save();
      return res.status(201).json({ msg: "User activated successfuly" });
    } catch (error) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  }
  static async getUser(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "User not found" });
    return res.status(200).json({ user: user });
  }
}

export default UsersController;
