const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../models");

//Authenticate dengan passport
const authenticate = async (name, email, password, done) => {
  try {
    const user = await User.findOne({ where: { name: name } });
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
    return done(null);
  }
};

module.exports = authenticate;
