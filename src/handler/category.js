class CategoryHandler {
  constructor(CategoryService) {
    this.CategoryService = CategoryService;

    //Agar tidak error : TypeError: Cannot read properties of undefined
    this.getAll = this.getAll.bind(this);
    // this.getCode = this.getCode.bind(this);
    this.create = this.create.bind(this);
  }

  getAll(req, res) {
    // res.status(200).send("Get All Category");
    const categories = this.CategoryService.getAll();
    return res.status(200).send(categories);
  }
  // getCode(req, res) {
  //   const category = req.body;
  //   const categories = this.CategoryService.getCode(category);
  //   res.status(200).send(categories);
  // }

  create(req, res) {
    const category = req.body;
    if (category.name === undefined || category.code === undefined) {
      return res
        .status(400)
        .send({ data: null, message: "Payload tidak boleh kosong" });
    }

    const categories = this.CategoryService.create(category);
    return res.status(200).send({ categories: categories });
  }
}

module.exports = CategoryHandler;
