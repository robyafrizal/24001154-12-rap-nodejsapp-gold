const express = require("express");
const app = express();
const PORT = 3001;

const UserRepository = require("./src/repository/user");
const UserService = require("./src/service/user");
const UserHandler = require("./src/handler/user");

app.use(express.json());

//Dependency Injection Method
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

app.get("/users", userHandler.getAll);
app.get("/users/:email", userHandler.getEmail);
app.put("/users/:email", userHandler.update);
app.delete("/users/:email", userHandler.delete);

app.post("/register", userHandler.register);
app.post("/login", userHandler.login);

app.listen(PORT, () => {
  console.log(`App running on http://localhost: ${PORT}`);
});

//Arsitektur NodeJS Backend, 3 layer :
//1. Handler (layer terluar paling dekat endpoint/client)
//2. Sevice (berhubungan dg logika pemograman)
//3. Repository (berhubungan dg Database)
