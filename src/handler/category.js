class CategoryHandler {
  constructor(CategoryService) {
    this.CategoryService = CategoryService;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    try {
      const categories = await this.CategoryService.getAll();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  async getById(req, res) {
    try {
      const id = req.params.id;
      const categoryById = await this.CategoryService.getById(id);
      return res.status(categoryById.statusCode).send(categoryById);
    } catch (error) {
      return res
        .status(categoryById.statusCode)
        .send({ message: error.message });
    }
  }
  async create(req, res) {
    try {
      const category = req.body;
      const categoryCreated = await this.CategoryService.create(category);
      return res
        .status(categoryCreated.statusCode)
        .send({ categogy: categoryCreated, message: categoryCreated.message });
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
  async update(req, res) {
    try {
      const { id, name, code } = req.body;
      const updateCategory = await this.CategoryService.update({
        id,
        name,
        code,
      });

      res
        .status(updateCategory.statusCode)
        .send({ users: updateCategory, message: updateCategory.message });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleteCategory = await this.CategoryService.delete(id);
      res
        .status(deleteCategory.statusCode)
        .send({ message: deleteCategory.message });
    } catch (err) {
      res.status(deleteCategory.statusCode).send({ message: err.message });
    }
  }
}

//-------------------------------------------------
// class CategoryHandler {
//   constructor(CategoryService) {
//     this.CategoryService = CategoryService;

//     //Agar tidak error : TypeError: Cannot read properties of undefined
//     this.getAll = this.getAll.bind(this);
//     // this.getCode = this.getCode.bind(this);
//     this.create = this.create.bind(this);
//   }

//   getAll(req, res) {
//     // res.status(200).send("Get All Category");
//     const categories = this.CategoryService.getAll();
//     return res.status(200).send(categories);
//   }
//   // getCode(req, res) {
//   //   const category = req.body;
//   //   const categories = this.CategoryService.getCode(category);
//   //   res.status(200).send(categories);
//   // }

//   create(req, res) {
//     const category = req.body;
//     if (category.name === undefined || category.code === undefined) {
//       return res
//         .status(400)
//         .send({ data: null, message: "Payload tidak boleh kosong" });
//     }

//     const categories = this.CategoryService.create(category);
//     return res.status(200).send({ categories: categories });
//   }
// }

module.exports = CategoryHandler;
