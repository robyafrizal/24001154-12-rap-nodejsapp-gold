class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async getAll() {
    const users = await this.UserRepository.getAll();
    return users;
  }
  async getById(id) {
    const userById = await this.UserRepository.getById(id);
    if (userById == false) {
      return { message: "User not found", statusCode: 400 };
    } else {
      return {
        userById: userById,
        message: "Get user by id success",
        statusCode: 200,
      };
    }
  }

  async update({ id, name, email, password }) {
    const updateUser = await this.UserRepository.update({
      id,
      name,
      email,
      password,
    });
    const userNotNull = await this.UserRepository.getById(id);
    // console.log(userNotNull[userNotNull.length - 1].id);
    if (id == userNotNull[userNotNull.length - 1].id) {
      return {
        updateUser: { name, email },
        message: "Update user success ",
        statusCode: 200,
      };
    }
    return { message: "User not found", statusCode: 400 };
  }

  async register({ name, email, password }) {
    const emailUser = await this.UserRepository.getByEmail(email);
    const newUser = { name, email, password };
    if (name === undefined || email === undefined || password === undefined) {
      return { message: "Payload can not empty", statusCode: 400 };
    } else {
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
  }

  async login({ email, password }) {
    const emailUser = await this.UserRepository.getByEmail(email);
    if (!emailUser) {
      return { message: "Email and password incorrrect", statusCode: 400 };
    }
    if (password === emailUser.password) {
      return { message: "Login Success", statusCode: 200 };
    } else {
      return { message: "Password incorrect", statusCode: 400 };
    }
  }

  async delete(id) {
    const deleteUser = await this.UserRepository.delete(id);
    if (deleteUser == false) {
      return { message: "User not found", statusCode: 400 };
    } else {
      return {
        deleteUser: deleteUser,
        message: "Delete user success",
        statusCode: 200,
      };
    }
  }

  //------------------------------------------------
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
