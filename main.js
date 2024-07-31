//-----------------Require-----------------------------
const express = require("express");
const cors = require("cors");

// const morgan = require("morgan");
// const session = require("express-session");
// const passport = require("passport");
// const passportConfig = require("./lib/passport");

const corsOptions = {
  origin: "http://localhost:" + process.env.port,
  optionsSuccessStatus: 200,
};

require("dotenv").config();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.port || 3001;

const router = require("./router");
// const nodemailer = require("nodemailer");

//------------------------Node_Mailer-----------------------------
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "robyafrizal86@gmail.com",
//     pass: "ryan171586",
//   },
// });

// const mail = {
//   from: "robyafrizal86@gmail.com",
//   to: "myboxlaundry86@gmail.com",
//   subject: "Hai roby",
//   text: "keep spirit yah",
// };

// transporter.sendMail(mail, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

//-----------------------------------------------------
// app.use(express.urlencoded({ extended: false }));
//-------------------View Engine EJS-----------------------------
app.set("view engine", "ejs");

//------------------------Local Strategy-----------------------------
// app.use(
//   session({
//     secret: "rahasia",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

//-------------------Router----------------------------
app.use(router);

//----------------------Import midddleware-----------------------------
// app.use(morgan("combined")); //For Logging

const logger = require("./src/middleware/logger"); //For Logging
app.use(logger);

const not_found = require("./src/middleware/not_found");
//-------------------404 Handler Error not found Middleware-----------------------------
//Menghandle error jika endpoint belum dibuat
app.use(not_found);

//-------------------Internal Server Erro Middlewarer-----------------------------
app.get("/get-error", (req, res) => {
  res.send(data); //Error data is not defined
});
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({ status: "Failed", errors: err.message });
});

//-------------------Listen_And_Note-----------------------------
app.listen(PORT, () => {
  console.log(`App running on http://localhost: ${PORT}`);
});
