//-----------------Require-----------------------------
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = express.Router();

// const morgan = require("morgan");
// const session = require("express-session");
// const passport = require("passport");
// const passportConfig = require("./lib/passport");

const corsOptions = {
  origin: "http://localhost:" + process.env.PORT,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 3001;

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
const authRouter = require("./src/router/auth");
const itemRouter = require("./src/router/item");
const orderRouter = require("./src/router/order");
const swaggerRouter = require("./src/router/swagger");
const userRouter = require("./src/router/user");

router.use(authRouter, itemRouter, orderRouter, swaggerRouter, userRouter);

app.use("/api", router);

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
