class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async getAll() {
    const users = await this.UserRepository.getAll();
    return users;
  }

  async register({ name, email, password }) {
    const emailUser = await this.UserRepository.getByEmail(email);
    const newUser = { name, email, password };
    console.log(emailUser);
    if (emailUser) {
      return { message: "User already registered", statusCode: 400 };
    } else {
      this.UserRepository.create(newUser);
      return {
        newUser: newUser,
        message: "User created success",
        statusCode: 200,
      };
    }
  }

  async login({ email, password }) {
    const emailUser = await this.UserRepository.getByEmail(email);
    console.log(emailUser);
    if (!emailUser) {
      return { message: "Email and password incorrrect", statusCode: 400 };
    }
    if (password === emailUser.password) {
      return { message: "Login Success", statusCode: 200 };
    } else {
      return { message: "Password incorrect", statusCode: 400 };
    }
  }

  // constructor(UserRepository) {
  //   this.UserRepository = UserRepository;
  // }

  // getAll() {
  //   const users = this.UserRepository.getAll();
  //   return users;
  // }
  // getEmail(email) {
  //   const user = this.UserRepository.getEmail(email);
  //   if (user === undefined) {
  //     return "Data not found";
  //   }
  //   return user;
  // }
  // add(user) {
  //   const users = this.UserRepository.add(user);
  //   return users;
  // }
  // update({ name, email, password }) {
  //   const users = this.UserRepository.update({ name, email, password });
  //   return users;
  // }

  // delete(email) {
  //   const user = this.UserRepository.delete(email);
  //   return user;
  // }

  // register({ name, email, password }) {
  //   const users = this.UserRepository.register({ name, email, password });
  //   return users;
  // }

  // login({ email, password }) {
  //   const users = this.UserRepository.login({ email, password });
  //   return users;
  // }

  //-------------------add code not run--------------------------
  // register(user) {
  //   try {
  //     return this.UserRepository.add(user);
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
module.exports = UserService;
