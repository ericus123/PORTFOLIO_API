import { sendEmail, setEmail } from "../../helpers/emails";
import { roleAssignEmail } from "../../helpers/emails/templates";
import User from "../../model/User";
class UserRoles {
  static async assignUserRole(req, res) {
    try {
      const { role, email } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (!user.isComplete) {
        return res.status(400).json({ msg: "User profile is not complete" });
      }
      if (!user.isVerified) {
        return res.status(400).json({ msg: "User profile is not verified" });
      }
      if (user.role === role) {
        return res.status(400).json({ msg: `User already has ${role} role` });
      }
      user.role = role;
      await user.save();
      const assigner = `${user.firstName} ${user.lastName}`;
      const assignee = user.firstName;
      const power = role.charAt(0).toUpperCase() + role.slice(1);

      await sendEmail(
        setEmail(
          process.env.EMAIL,
          user.email,
          "Assigned Role",
          roleAssignEmail({ assignee, assigner, power })
        )
      );
      return res.status(201).json({
        msg: "Role assigned successfuly",
      });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
export default UserRoles;
