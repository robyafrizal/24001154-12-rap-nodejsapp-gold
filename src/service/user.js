class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async getAll() {
    try {
      const userList = await this.UserRepository.findAll();

      return {
        statusCode: 200,
        users: userList,
      };
    } catch (err) {
      return {
        statusCode: 500,
        users: null,
      };
    }
  }

  async getId(id) {
    const userById = await this.UserRepository.findId(id);
    if (!userById) {
      return { message: "User not found", statusCode: 404 };
    } else {
      return {
        userById: userById,
        message: "Get user by id success",
        statusCode: 200,
      };
    }
  }

  // async getEmail(email) {
  //   try {
  //     const userEmail = await this.UserRepository.findEmail(email);

  //     if (userEmail) {
  //       return {
  //         statusCode: 200,
  //         users: userEmail,
  //       };
  //     }
  //   } catch (err) {
  //     return {
  //       statusCode: 500,
  //       users: null,
  //     };
  //   }
  // }

  async update({ id, name, email, password, profile_picture }) {
    const updateUser = await this.UserRepository.update({
      id,
      name,
      email,
      password,
      profile_picture,
    });
    const userId = await this.UserRepository.findId(id);
    if (userId != null) {
      return {
        updateUser: { name, email, profile_picture },
        message: "Update user success ",
        statusCode: 200,
      };
    } else {
      return { statusCode: 404, message: "User not found" };
    }
  }

  async delete(id) {
    const deleteUser = await this.UserRepository.delete(id);
    if (deleteUser == false) {
      return { message: "User not found", statusCode: 404 };
    } else {
      return {
        deleteUser: deleteUser,
        message: "Delete user success",
        statusCode: 204,
      };
    }
  }
}
module.exports = UserService;
