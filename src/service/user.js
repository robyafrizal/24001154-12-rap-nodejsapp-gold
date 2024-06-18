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
      return "Data not found";
    }
    return user;
  }
  add(user) {
    const users = this.UserRepository.add(user);
    return users;
  }
  update({ name, email, password }) {
    const users = this.UserRepository.update({ name, email, password });
    return users;
  }

  delete(email) {
    const user = this.UserRepository.delete(email);
    return user;
  }

  register({ name, email, password }) {
    const users = this.UserRepository.register({ name, email, password });
    return users;
  }

  login({ email, password }) {
    const users = this.UserRepository.login({ email, password });
    return users;
  }

  // register(user) {
  //   try {
  //     return this.UserRepository.add(user);
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
module.exports = UserService;
