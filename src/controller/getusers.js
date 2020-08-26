import User from "../model/User";
const getusersController = async (req, res, next) => {
  User.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      const users = result;
      res.send(users);
    }
  });
};

export default getusersController;
