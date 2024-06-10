const users = require("../../db/users.json");

class UserRepository {
  constructor() {
    this.users = users;
  }

  getAll() {
    return this.users;
  }

  getEmail(email) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        return this.users[i];
      }
    }
    // return this.users.find((user) => user.email === email);
  }

  update({ name, email, password }) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        users[i] = { name: name, email: email, password: password };
        return "Update Success";
      }
    }
    return "User can't updated";
  }

  delete(email) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == email) {
        // const deletedUser = delete users[i];
        const deletedUser = this.users.splice(i, 1);
        return "Delete Success";
      }
    }
    return "User has been deleted";
  }

  register({ name, email, password }) {
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].name === name ||
        this.users[i].email === email ||
        this.users[i].password === password
      ) {
        return "User has registered";
      }
    }
    this.users.push({ name, email, password });
    // console.log(users);
    return "Register Success";
  }

  login({ email, password }) {
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].email === email &&
        this.users[i].password === password
      ) {
        return "Login Success";
      }
    }
    return "Email and password incorrect";
    // console.log(users);
  }
}

module.exports = UserRepository;
