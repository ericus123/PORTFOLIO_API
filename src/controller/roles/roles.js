import User from "../../model/User";
class UserRoles {
  static async assignRoles(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "user not found" });
    await user.updateOne({ role: req.body.role });
    const assignedUser = await User.find({ email: req.body.email });
    res
      .status(201)
      .json({ msg: "role assigned successfuly", user: assignedUser });
  }
}
export default UserRoles;
