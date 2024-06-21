const sql = require("../config/postgres");

class UserRepository {
  constructor() {}

  async getAll() {
    const getUsers = await sql`select id, name, email from users`;
    return getUsers;
  }

  async getByEmail(email) {
    const getEmailUser =
      await sql`select email,password from users where email=${email}`;
    return getEmailUser[0];
  }

  async create(user) {
    const createUser =
      await sql`insert into users(name,email,password) values(${user.name}, ${user.email}, ${user.password})`;
    return createUser;
  }
}

// const users = require("../../db/users.json");

// class UserRepository {
//   constructor() {
//     this.users = users;
//   }

//   getAll() {
//     return this.users;
//   }

//   getEmail(email) {
//     for (let i = 0; i < this.users.length; i++) {
//       if (this.users[i].email === email) {
//         return this.users[i];
//       }
//     }
//     // return this.users.find((user) => user.email === email);
//   }
//   //----------------------------------
//   // add(user) {
//   //   return this.users.push(user);
//   // }
//   add({ name, email, password }) {
//     return this.users.push({ name, email, password });
//   }

//   //----------------------------------
//   update({ name, email, password }) {
//     for (let i = 0; i < this.users.length; i++) {
//       if (this.users[i].email === email) {
//         this.users[i] = { name: name, email: email, password: password };
//         return "Update Success";
//       }
//     }
//     return "Payload data is empty";
//   }

//   delete(email) {
//     for (let i = 0; i < this.users.length; i++) {
//       if (this.users[i].email == email) {
//         // const deletedUser = delete users[i];
//         const deletedUser = this.users.splice(i, 1);
//         return "Delete Success";
//       }
//     }
//     return "Data not found";
//   }

//   register({ name, email, password }) {
//     for (let i = 0; i < this.users.length; i++) {
//       if (
//         this.users[i].name === name ||
//         this.users[i].email === email ||
//         this.users[i].password === password
//       ) {
//         return "User has registered";
//       }
//     }
//     this.users.push({ name, email, password });
//     // console.log(users);
//     return "Register Success";
//   }

//   login({ email, password }) {
//     for (let i = 0; i < this.users.length; i++) {
//       if (
//         this.users[i].email === email &&
//         this.users[i].password === password
//       ) {
//         return "Login Success";
//       }
//     }
//     return "Email and password incorrect";
//   }
// }

module.exports = UserRepository;
