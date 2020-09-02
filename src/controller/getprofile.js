import User from "../model/User";
const getprofileController = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
  const id = req.user.id;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).json({ error: "user not found" });

    const profile = {
      username: user.username,
      email: user.email,
      bio: user.bio,
    };
    res.send({ profile });
  } catch {
    res.status(404);
    res.send({
      error: "error retrieving user",
    });
  }
};

export default getprofileController;
