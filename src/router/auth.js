//-----------------Auth Handler------------------------------
const express = require("express");

const UserRepository = require("../repository/user");
const MailRepository = require("../repository/mail");
const AuthService = require("../service/auth");
const AuthHandler = require("../handler/auth");

const userRepository = new UserRepository();
const nodeMailer = new MailRepository();
const authService = new AuthService(userRepository, nodeMailer);
const authHandler = new AuthHandler(authService);
// console.log("auth service");

const router = express.Router();

// router.get("/register", authHandler.registerPage);
router.post("/register", authHandler.register);
router.post("/login", authHandler.login);
// router.get("/login", authHandler.loginPage);

// router.get("/", (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.render("index");
//   } else {
//     res.redirect("/login");
//   }
// });

module.exports = router;
