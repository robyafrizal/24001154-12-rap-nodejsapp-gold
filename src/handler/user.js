class UserHandler {
  constructor(UserService) {
    this.UserService = UserService;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    try {
      const users = await this.UserService.getAll();
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
  async getById(req, res) {
    try {
      const id = req.params.id;
      const userById = await this.UserService.getById(id);
      res.status(userById.statusCode).send(userById);
    } catch (err) {
      res.status(userById.statusCode).send({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id, name, email, password } = req.body;
      const updateUser = await this.UserService.update({
        id,
        name,
        email,
        password,
      });

      res
        .status(updateUser.statusCode)
        .send({ users: updateUser, message: updateUser.message });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const userRegister = await this.UserService.register({
        name,
        email,
        password,
      });

      res
        .status(userRegister.statusCode)
        .send({ users: userRegister, message: userRegister.message });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userLogin = await this.UserService.login({ email, password });

      res
        .status(userLogin.statusCode)
        .send({ user: userLogin, message: userLogin.message });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleteUser = await this.UserService.delete(id);
      res.status(deleteUser.statusCode).send({ message: deleteUser.message });
    } catch (err) {
      res.status(deleteUser.statusCode).send({ message: err.message });
    }
  }

  // constructor(UserService) {
  //   this.UserService = UserService;

  //   this.getAll = this.getAll.bind(this);
  //   this.getEmail = this.getEmail.bind(this);
  //   this.update = this.update.bind(this);
  //   this.delete = this.delete.bind(this);
  //   this.register = this.register.bind(this);
  //   this.login = this.login.bind(this);
  // }

  // getAll(req, res) {
  //   const users = this.UserService.getAll();

  //   res.status(200).send(users);
  // }

  // getEmail(req, res) {
  //   const email = req.params.email;
  //   const user = this.UserService.getEmail(email);

  //   let statusCode = 200;

  //   if (user === "Data not found") {
  //     statusCode = 404;
  //   }
  //   res.status(statusCode).send({ user: user });
  // }

  // update(req, res) {
  //   const name = req.body.name;
  //   const email = req.body.email;
  //   const password = req.body.password;

  //   const users = this.UserService.update({ name, email, password });

  //   let statusCode = 200;
  //   if (users === "Payload data is empty") {
  //     statusCode = 400;
  //   }
  //   res.status(statusCode).send({ users: users });
  // }

  // delete(req, res) {
  //   const email = req.params.email;
  //   const user = this.UserService.delete(email);

  //   let statusCode = 200;

  //   if (user === "Data not found") {
  //     statusCode = 404;
  //   }
  //   res.status(statusCode).send({ user: user });
  // }

  // register(req, res) {
  //   const user = req.body;
  //   if (!user.name || !user.email || !user.password) {
  //     return res.status(400).send("Payload harus diisi");
  //   }
  //   const users = this.UserService.register(user);

  //   // return 201 (created) ketika berhasil
  //   let statusCode = 201;

  //   // gagal return 400
  //   if (users === "User has registered") {
  //     statusCode = 400;
  //   }
  //   res.status(statusCode).send({ users: users });
  // }

  // login(req, res) {
  //   const { email, password } = req.body;
  //   const users = this.UserService.login({ email, password });

  //   let statusCode = 200;

  //   if (users === "Email and password incorrect") {
  //     statusCode = 400;
  //   }
  //   res.status(statusCode).send({ users: users });
  // }
}

module.exports = UserHandler;
