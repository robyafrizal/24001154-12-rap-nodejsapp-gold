class UserHandler {
  constructor(UserService) {
    this.UserService = UserService;

    this.getAll = this.getAll.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  getAll(req, res) {
    const users = this.UserService.getAll();

    res.status(200).send(users);
  }

  getEmail(req, res) {
    const email = req.params.email;
    const user = this.UserService.getEmail(email);

    let statusCode = 200;

    if (user === "User not found") {
      statusCode = 404;
    }
    res.status(statusCode).send({ user: user });
  }

  update(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const users = this.UserService.update({ name, email, password });

    let statusCode = 200;
    if (users === "User can't updated") {
      statusCode = 400;
    }
    res.status(statusCode).send({ users: users });
  }

  delete(req, res) {
    const email = req.params.email;
    const user = this.UserService.delete(email);

    let statusCode = 200;

    if (user === "User has been deleted") {
      statusCode = 404;
    }
    res.status(statusCode).send({ user: user });
  }

  register(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const users = this.UserService.register({ name, email, password });

    // return 201 (created) ketika berhasil
    let statusCode = 201;

    // gagal return 400
    if (users === "User has registered") {
      statusCode = 400;
    }
    res.status(statusCode).send({ users: users });
  }

  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const users = this.UserService.login({ email, password });

    let statusCode = 200;

    if (users === "Email and password incorrect") {
      statusCode = 400;
    }
    res.status(statusCode).send({ users: users });
  }
}

module.exports = UserHandler;
