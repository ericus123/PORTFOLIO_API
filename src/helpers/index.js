import bcrypt from "bcryptjs";

export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const hashedPassword = async (pass, saltLen) => {
  const salt = await bcrypt.genSalt(saltLen);
  const hashed = await bcrypt.hash(pass, salt);
  return hashed;
};
