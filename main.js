//-----------------Require-----------------------------
const express = require("express");
const app = express();
const PORT = 3001;

//Static file
const path = require("path");
app.use(express.static("public"));

//Import midddleware
const logger = require("./src/middleware/logger");
const not_found = require("./src/middleware/not_found");

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

app.use(express.json());
app.use(logger);

//-----------------User Handler------------------------------
//Dependency Injection Method
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

app.get("/users", userHandler.getAll);
app.get("/users/:id", userHandler.getById);
// app.get("/users/:email", userHandler.getEmail);
app.put("/users", userHandler.update);
app.delete("/users/:id", userHandler.delete);
// app.delete("/users/:email", userHandler.delete);

app.post("/register", userHandler.register);
app.post("/login", userHandler.login);

//-------------------Category Handler-----------------------------
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryHandler = new CategoryHandler(categoryService);

app.get("/categories", categoryHandler.getAll);
app.get("/categories/:id", categoryHandler.getById);
app.post("/categories", categoryHandler.create);
app.put("/categories", categoryHandler.update);
app.delete("/categories/:id", categoryHandler.delete);

//---------------------Order Handler-----------------------------------
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderHandler = new OrderHandler(orderService);

app.get("/orders", orderHandler.getAll);
app.get("/orders/:id", orderHandler.getById);
app.post("/orders", orderHandler.create);
// app.get("/orders/:id", orderHandler.getById);
// app.put("/orders/:id", orderHandler.update);
// app.delete("/orders/:id", orderHandler.delete);

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
app.get("/products/:id", productHandler.getById);
app.put("/products", productHandler.update);
app.delete("/products/:id", productHandler.delete);

//-------------------Routing Middleware-----------------------------
const testRouter = express.Router();

testRouter.use((req, res, next) => {
  console.log("Ini middleware khusus endpoint testing");
  next(); //Lanjut ke middleware berikutnya
});
testRouter.use(function timeLog(req, res, next) {
  console.log("Time", Date.now());
  next();
});
testRouter.get("/test", (req, res) => {
  res.send("Ini data testing");
});

app.use(testRouter);

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

//------------Static file - Endpoint untuk show images----------------
app.get("/image.jpeg", (req, res) => {
  res.sendFile(path.join(__dirname, "image.jpeg"));
});

//-------------------Listen_And_Note-----------------------------
app.listen(PORT, () => {
  console.log(`App running on http://localhost: ${PORT}`);
});

//Arsitektur NodeJS Backend, 3 layer :
//1. Handler (layer terluar paling dekat endpoint/client)
//2. Sevice (berhubungan dg logika pemograman)
//3. Repository (berhubungan dg Database)
