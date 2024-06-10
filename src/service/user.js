class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  getAll() {
    const users = this.UserRepository.getAll();
    return users;
  }
  getEmail(email) {
    const user = this.UserRepository.getEmail(email);
    if (user === undefined) {
      return "User not found";
    }
    return user;
  }

  update({ name, email, password }) {
    const users = this.UserRepository.update({ name, email, password });
    if (users === undefined) {
      return "User not found";
    }
    return users;
  }

  delete(email) {
    const user = this.UserRepository.delete(email);
    // if (user === undefined) {
    //   return "User has been deleted";
    // }
    return user;
  }

  register({ name, email, password }) {
    const users = this.UserRepository.register({ name, email, password });

    // if (users === undefined) {
    //   return "User has registered";
    // }
    // console.log(users);

    return users;
  }

  login({ email, password }) {
    const users = this.UserRepository.login({ email, password });
    // if (users === undefined) {
    //   return "Email and password incorrect";
    // }
    // console.log(users);
    return users;
  }
}
module.exports = UserService;
