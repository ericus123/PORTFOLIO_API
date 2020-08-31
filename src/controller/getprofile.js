import User from "../model/User";
const getprofileController = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
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
