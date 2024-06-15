//-----------------Require-----------------------------
const express = require("express");
const app = express();
const PORT = 3001;

const UserRepository = require("./src/repository/user");
const UserService = require("./src/service/user");
const UserHandler = require("./src/handler/user");

const ProductHandler = require("./src/handler/product");
const ProductService = require("./src/service/product");
const ProductRepository = require("./src/repository/product");

const CategoryHandler = require("./src/handler/category");
const CategoryService = require("./src/service/category");
const CategoryRepository = require("./src/repository/category");

const OrderHandler = require("./src/handler/order");
const OrderService = require("./src/service/order");
const OrderRepository = require("./src/repository/order");
//-----------------User Handler------------------------------
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.hostname} ${req.url}`);
  next();
};
app.use(express.json());
app.use(logger);

//Dependency Injection Method
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

app.get("/users", userHandler.getAll);
app.get("/users/:email", userHandler.getEmail);
app.put("/users", userHandler.update);
app.delete("/users/:email", userHandler.delete);

app.post("/register", userHandler.register);
app.post("/login", userHandler.login);

//-------------------Category Handler-----------------------------
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryHandler = new CategoryHandler(categoryService);

app.get("/categories", categoryHandler.getAll);
app.post("/categories", categoryHandler.create);

//---------------------Order Handler-----------------------------------
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderHandler = new OrderHandler(orderService);

app.get("/orders", orderHandler.getAll);
app.post("/orders", orderHandler.create);
app.get("/orders/:id", orderHandler.getById);
app.put("/orders/:id", orderHandler.update);
app.delete("/orders/:id", orderHandler.delete);

//------------------Product Handler------------------------------
const productRepository = new ProductRepository();
const productService = new ProductService(
  productRepository,
  userRepository,
  categoryRepository
);
const productHandler = new ProductHandler(productService);

app.get("/products", productHandler.getAll);
app.post("/products", productHandler.create);

//-------------------Listen_And_Note-----------------------------
app.listen(PORT, () => {
  console.log(`App running on http://localhost: ${PORT}`);
});

//Arsitektur NodeJS Backend, 3 layer :
//1. Handler (layer terluar paling dekat endpoint/client)
//2. Sevice (berhubungan dg logika pemograman)
//3. Repository (berhubungan dg Database)
