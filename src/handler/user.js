//-----------------Cloudinary------------------------------
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dtyevm8fs",
  api_key: "492215468748176",
  api_secret: "tHNIkWAVahfdOGpbBrjc3y5IMmg",
});

async function uploadCloudinary(filepath) {
  let result;
  try {
    result = await cloudinary.uploader.upload(filepath, {
      use_filename: true,
    });
    fs.unlinkSync(filepath);
    return result.url;
  } catch (err) {
    fs.unlinkSync(filepath);
    return null;
  }
}

class UserHandler {
  constructor(UserService) {
    this.UserService = UserService;

    this.getAll = this.getAll.bind(this);
    this.getId = this.getId.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    const serviceRes = await this.UserService.getAll();

    res.status(serviceRes.statusCode).send({
      users: serviceRes.users,
    });
  }

  async getId(req, res) {
    try {
      const id = req.params.id;
      const userById = await this.UserService.getId(id);
      res
        .status(userById.statusCode)
        .send({ users: userById.userById, message: userById.message });
    } catch (err) {
      res.status(userById.statusCode).send({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { name, email, password } = req.body;
      const { id } = req.params;
      const updateUser = await this.UserService.update({
        name,
        email,
        password,
        id,
      });

      res
        .status(updateUser.statusCode)
        .send({ users: updateUser, message: updateUser.message });
    } catch (err) {
      res.status(updateUser.statusCode).send({ message: err.message });
    }
  }

  async profile(req, res) {
    const url = await uploadCloudinary(req.file.path);
    if (url) {
      return res.json({
        message: "Upload success",
        url: url,
      });
    } else {
      return res.json({
        message: "Upload failed",
      });
    }
  }
  async photos(req, res) {
    let urls = [];
    for (const file of req.files) {
      const url = await uploadCloudinary(file.path);
      if (url) {
        urls.push(url);
      } else {
        return res.json({
          message: "Upload failed",
        });
      }
    }
    return res.json({
      message: "Upload success",
      url: urls,
    });
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleteUser = await this.UserService.delete(id);
      res.status(deleteUser.statusCode).send({ message: deleteUser.message });
    } catch (err) {
      res.status(deleteUser.statusCode).send({ message: err.message });
    }
  }

  // async profile(req, res) {
  //   res.send(req.file);
  // }

  // async photos(req, res) {
  //   res.send({ data: req.file, message: "Upload successfully" });
  //   // console.log(req.file);
  // }
}

module.exports = UserHandler;
