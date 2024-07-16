//-----------------Require-----------------------------
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./lib/passport");

const app = express();
const PORT = process.env.port || 3001;
const router = require("./router");

app.use(express.urlencoded({ extended: false }));

//------------------------Local Strategy-----------------------------
app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//----------------------Import midddleware-----------------------------
const logger = require("./src/middleware/logger");
const not_found = require("./src/middleware/not_found");

app.use(express.json());
app.use(logger);

//-------------------View Engine EJS-----------------------------
app.set("view engine", "ejs");

//-------------------Router----------------------------
app.use(router);

//-------------------Internal Server Erro Middlewarer-----------------------------
app.get("/get-error", (req, res) => {
  res.send(data); //Error data is not defined
});
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({ status: "Failed", errors: err.message });
});

//-------------------404 Handler Error not found Middleware-----------------------------
//Menghandle error jika endpoint belum dibuat
app.use(not_found);

//-------------------Listen_And_Note-----------------------------
app.listen(PORT, () => {
  console.log(`App running on http://localhost: ${PORT}`);
});
