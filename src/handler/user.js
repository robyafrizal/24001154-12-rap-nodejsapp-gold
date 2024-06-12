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

    if (user === "User can't deleted") {
      statusCode = 404;
    }
    res.status(statusCode).send({ user: user });
  }

  register(req, res) {
    const { name, email, password } = req.body;
    const users = this.UserService.register({ name, email, password });

    // return 201 (created) ketika berhasil
    let statusCode = 201;

    // gagal return 400
    if (users === "User has registered") {
      statusCode = 400;
    } else if (users === "User can't empty") {
      statusCode = 401;
    }
    res.status(statusCode).send({ users: users });
  }

  login(req, res) {
    const { email, password } = req.body;
    const users = this.UserService.login({ email, password });

    // let statusCode = 200;

    // if (users === "Email and password incorrect") {
    //   statusCode = 400;
    // } else if (users === undefined) {
    //   statusCode = 401;
    //   message = "User not found";
    // }
    // res.status(statusCode).send({ users: users });

    if (users.email !== email && users.password !== password) {
      res.status(400).send({ message: "Email and password incorrect" });
    } else if (users.email === undefined && users.password === undefined) {
      res.status(401).send({ message: "Email and password can not empty" });
    } else {
      res.status(200).send({ message: "Login Success" });
    }
  }
  // validateUser(isSuccess, data, err) {
  //   if (isSuccess) {
  //     return { status: "Success", data: data };
  //   } else {
  //     return { status: "Failed", message: err };
  //   }
  // }
  // register(req, res) {
  //   const user = req.body;
  //   if (this.#isUser(user)) {
  //     this.UserService.register(user)
  //       .then((result) => {
  //         res.status(201).send();
  //       })
  //       .catch((err) => {
  //         res.status(404).send(this.#validateUser(false, null, err));
  //       });
  //   } else {
  //     res.status(404).send(this.#validateUser(false, null, "User not found"));
  //   }
  // }
  // #isUser(user) {
  //   return user?.name != null && user?.email != null && user?.password != null;
  // }
  // login(req,res){
  //   const user = req.body
  //   const existUser = this.UserService.getEmail(user.email)
  //   console.log(existUser)
  //   if(existUser && existUser.password === user.password){
  //     res
  //       .status(200)
  //       .send(this.#validateUser(true, existUser, null));
  //   }
  //   else{
  //     res
  //       .status(400)
  //       .send(this.#validateUser(false, null, "Wrong email and password"));
  //   }
  // }
}

module.exports = UserHandler;
