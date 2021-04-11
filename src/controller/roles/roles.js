import User from "../../model/User";
class UserRoles {
  static async assignRoles(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const assignedUser = await user.updateOne({ role: req.body.role });

    return res
      .status(201)
      .json({ msg: "Role assigned successfuly", user: assignedUser });
  }
}
export default UserRoles;
