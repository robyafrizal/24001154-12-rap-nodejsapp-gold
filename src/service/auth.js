class AuthService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async register({ name, email, password }) {
    const emailUser = await this.UserRepository.findEmail({
      name,
      email,
      password,
    });
    const newUser = { name, email, password };
    if (name === undefined || email === undefined || password === undefined) {
      return { message: "Payload can not empty", statusCode: 400 };
    } else {
      if (emailUser) {
        return { message: "User already registered", statusCode: 401 };
      } else {
        this.UserRepository.create(newUser);
        return {
          newUser: newUser,
          message: "User created success",
          statusCode: 200,
        };
      }
    }
  }

  async login({ email, password }) {
    const loginUser = await this.UserRepository.findEmail({ email, password });
    if (!loginUser) {
      return {
        loginUser: null,
        message: "Email and password incorrrect",
        statusCode: 400,
      };
    }
    if (password === loginUser.password) {
      return {
        loginUser: loginUser,
        message: "Login Success",
        statusCode: 200,
      };
    } else {
      return {
        loginUser: null,
        message: "Password incorrect",
        statusCode: 400,
      };
    }
  }
}
module.exports = AuthService;
