import jwt from "jsonwebtoken";


export const generateToken = async (data,time) => {
    try{
        const token = jwt.sign(
          data,
            process.env.TOKEN_SECRET,
            { expiresIn: time }
          );
          return token;
    }catch(error){
   return error;
    }
}
