class AuthHandler {
  constructor(AuthService) {
    this.AuthService = AuthService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    try {
      const payload = req.body;
      const userRegister = await this.AuthService.register(payload);

      res
        .status(userRegister.statusCode)
        .send({ users: userRegister.newUser, message: userRegister.message });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userLogin = await this.AuthService.login({ email, password });
      res
        .status(userLogin.statusCode)
        .send({ user: userLogin.loginUser, message: userLogin.message });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = AuthHandler;
