//-----------------Require-----------------------------
const express = require("express");
const app = express();
const PORT = 3001;

//Import midddleware
const logger = require("./src/middleware/logger");
const not_found = require("./src/middleware/not_found");

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

app.use(express.json());
app.use(logger);

//-----------------User Handler------------------------------
//Dependency Injection Method
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

app.get("/users", userHandler.getAll);
app.get("/users/:id", userHandler.getId);
app.put("/users", userHandler.update);
app.delete("/users/:id", userHandler.delete);

//-----------------Auth Handler------------------------------
const authService = new AuthService(userRepository);
const authHandler = new AuthHandler(authService);
// console.log("auth service");

app.post("/register", authHandler.register);
app.post("/login", authHandler.login);

//---------------------Order Handler-----------------------------------
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderHandler = new OrderHandler(orderService);
// console.log("order service");

app.get("/orders", orderHandler.getAll);
app.get("/orders/:id", orderHandler.getId);
app.post("/orders", orderHandler.create);
app.put("/orders", orderHandler.update);
app.delete("/orders/:id", orderHandler.delete);

//------------------Item Handler------------------------------
const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemHandler = new ItemHandler(itemService);

app.get("/items", itemHandler.getAll);
app.post("/items", itemHandler.create);
app.get("/items/:id", itemHandler.getId);
app.put("/items", itemHandler.update);
app.delete("/items/:id", itemHandler.delete);

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
