// const authMiddleware = require("./src/middleware/auth");

const router = require("express").Router();
const multer = require("multer");

// router.get("/", (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.render("index");
//   } else {
//     res.redirect("/login");
//   }
// });

//-----------------------------------------------
const UserRepository = require("./src/repository/user");
const UserService = require("./src/service/user");
const UserHandler = require("./src/handler/user");
const AuthService = require("./src/service/auth");
const AuthHandler = require("./src/handler/auth");

const ItemHandler = require("./src/handler/item");
const ItemService = require("./src/service/item");
const ItemRepository = require("./src/repository/item");

const OrderHandler = require("./src/handler/order");
const OrderService = require("./src/service/order");
const OrderRepository = require("./src/repository/order");

//-----------------User Handler------------------------------
//Dependency Injection Method
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

// router.get(
//   "/users",
//   authMiddleware.authenticate,
//   authMiddleware.checkUserIsRyanti,
//   userHandler.getAll
// );
router.get("/users", userHandler.getAll);
router.get("/users/:id", userHandler.getId);
router.put("/users/:id", userHandler.update);
router.delete("/users/:id", userHandler.delete);

//-------------------Multer-file_upload-----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      return callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/profile", upload.single("avatar"), userHandler.profile);
router.post("/photos/upload", upload.array("photos"), userHandler.photos);

//-----------------Auth Handler------------------------------
const authService = new AuthService(userRepository);
const authHandler = new AuthHandler(authService);
// console.log("auth service");

// router.get("/register", authHandler.registerPage);
router.post("/register", authHandler.register);
// router.get("/login", authHandler.loginPage);
router.post("/login", authHandler.login);

//---------------------Order Handler-----------------------------------
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderHandler = new OrderHandler(orderService);
// console.log("order service");

router.get("/orders", orderHandler.getAll);
router.get("/orders/:id", orderHandler.getId);
router.post("/orders", orderHandler.create);
router.put("/orders/:id", orderHandler.update);
router.delete("/orders/:id", orderHandler.delete);

//------------------Item Handler------------------------------
const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemHandler = new ItemHandler(itemService);

router.get("/items", itemHandler.getAll);
router.post("/items", itemHandler.create);
router.get("/items/:id", itemHandler.getId);
router.put("/items/:id", itemHandler.update);
router.delete("/items/:id", itemHandler.delete);

//-------------------Swagger----------------------------
const swaggerJSON = require("./swagger/swagger.json");
const swaggerUI = require("swagger-ui-express");

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerJSON));

module.exports = router;
