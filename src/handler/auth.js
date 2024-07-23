class AuthHandler {
  constructor(AuthService) {
    this.AuthService = AuthService;

    this.register = this.register.bind(this);
    // this.registerPage = this.registerPage.bind(this);
    this.login = this.login.bind(this);
  }

  // async register(req, res) {
  //   try {
  //     const payload = req.body;
  //     const userRegister = await this.AuthService.register(payload);

  //     res
  //       .status(userRegister.statusCode)
  //       .send({ users: userRegister.newUser, message: userRegister.message });
  //     res.redirect("login");
  //   } catch (err) {
  //     res.status(500).send({ message: err.message });
  //     res.redirect("register");
  //   }
  // }

  // async registerPage(req, res) {
  //   res.render("register");
  // }

  async login(req, res) {
    const payload = req.body;
    const serviceRes = await this.AuthService.login(payload);

    res.status(serviceRes.statusCode).send({
      message: serviceRes.message,
      token: serviceRes.token,
    });
  }

  async register(req, res) {
    const payload = req.body;
    const serviceRes = await this.AuthService.register(payload);
    res.status(serviceRes.statusCode).send({
      created_user: serviceRes.createdUser,
    });
  }

  // async login(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     const userLogin = await this.AuthService.login({ email, password });
  //     res
  //       .status(userLogin.statusCode)
  //       .send({ user: userLogin.loginUser, message: userLogin.message });
  //     passport.authenticate("local", {
  //       successRedirect: "/",
  //       failureRedirect: "/login",
  //       failureFlash: true,
  //     });
  //   } catch (err) {
  //     res.status(500).send({ message: err.message });
  //   }
  // }

  // async loginPage(req, res) {
  //   let message = "";
  //   if (req.session) {
  //     if (req.session.message) {
  //       message = req.session.message[0];
  //       req.sessian.message = [];
  //     }
  //   }
  //   return res.render("login", { message: message });
  // }
}

module.exports = AuthHandler;
