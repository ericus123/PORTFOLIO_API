const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
let mongoose = require("mongoose");
const { generateToken } = require("../helpers/tokens");
const { randomString, hashedPassword } = require("../helpers");
const User = mongoose.model("User");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: "http://localhost:3000/api/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email } = profile._json;
      // check if user already exists
      const currentUser = await User.findOne({ email: email });

      if (currentUser) {
        // already have the user -> return (login)
        const token = await generateToken({ email }, "5m");
        return done(null, { profile: profile._json, token });
      } else {
        const { given_name, family_name, email } = profile._json;
        const user = await new User({
          username: randomString(6),
          firstName: given_name || "UNKNOWN",
          lastName: family_name || "Unknown",
          email: email,
          password: await hashedPassword(randomString(10), 10),
        });
        await user.save();
        const token = await generateToken({ email: user.email }, "5m");
        return done(null, { user, token });
      }
    }
  )
);
