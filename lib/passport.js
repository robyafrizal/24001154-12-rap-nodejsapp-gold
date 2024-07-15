const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../models");

//Authenticate dengan passport
const authenticate = async (name, email, password, done) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return done(null, false, {
        message: "User not found",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, {
        message: "Wrong Password",
      });
    }
    return done(null, user);
  } catch (err) {
    return done(null, false, {
      message: err.message,
    });
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
    },
    authenticate
  )
);
passport.serializeUser((user, done) => {
  return done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPK(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
