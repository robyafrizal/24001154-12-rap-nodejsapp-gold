const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  // async register({ name, email, password }) {
  //   const emailUser = await this.UserRepository.findEmail({
  //     name,
  //     email,
  //     password,
  //   });
  //   const newUser = { name, email, password };
  //   if (name === undefined || email === undefined || password === undefined) {
  //     return { message: "Payload can not empty", statusCode: 400 };
  //   } else {
  //     if (emailUser) {
  //       return { message: "User already registered", statusCode: 401 };
  //     } else {
  //       this.UserRepository.create(newUser);
  //       return {
  //         newUser: newUser,
  //         message: "User created success",
  //         statusCode: 200,
  //       };
  //     }
  //   }
  // }

  async register({ name, email, password }) {
    try {
      const salt = 10;
      const encryptedPassword = bcrypt.hashSync(password, salt);

      const createdUser = await this.UserRepository.create({
        name,
        email,
        password: encryptedPassword,
      });

      return {
        statusCode: 201,
        createdUser: createdUser,
      };
    } catch (err) {
      return {
        statusCode: 500,
        createdUser: null,
      };
    }
  }

  async login({ email, password }) {
    // TODO: get user by email
    // check password
    const user = await this.UserRepository.getByEmail(email);

    const isValid = bcrypt.compareSync(password, user.password);

    if (isValid) {
      // TODO: generate jwt token
      // payloadnya: email
      const jwtSecret = "SECRET";
      const jwtExpireTime = "24h";

      const token = jwt.sign(
        {
          email: user.email,
        },
        jwtSecret,
        {
          expiresIn: jwtExpireTime,
        }
      );

      return {
        statusCode: 200,
        message: "Login berhasil",
        token: token,
      };
    }

    return {
      statusCode: 400,
      message: "Login gagal",
      token: null,
    };
  }

  // async login({ email, password }) {
  //   const loginUser = await this.UserRepository.findEmail({ email, password });
  //   if (!loginUser) {
  //     return {
  //       loginUser: null,
  //       message: "Email and password incorrrect",
  //       statusCode: 400,
  //     };
  //   }
  //   if (password === loginUser.password) {
  //     return {
  //       loginUser: loginUser,
  //       message: "Login Success",
  //       statusCode: 200,
  //     };
  //   } else {
  //     return {
  //       loginUser: null,
  //       message: "Password incorrect",
  //       statusCode: 400,
  //     };
  //   }
  // }
}
module.exports = AuthService;
