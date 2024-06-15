class ProductHandler {
  constructor(ProductService) {
    this.ProductService = ProductService;

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  getAll(req, res) {
    const products = this.ProductService.getAll();

    res.status(200).send({ message: products });

    // res
    //   .status(200)
    //   .send(this.#validateData(true, { products: products }, null));
  }

  create(req, res) {
    const product = req.body;
    console.log(product);
    if (!product.name) {
      return res.status(400).send("Payload harus diisi");
    }
    const products = this.ProductService.create(product);

    let statusCode = 200;
    if (products === "Product already exist") {
      return res
        .status(400)
        .send(
          this.#validateData(false, { product: null }, "Product already exist")
        );
    } else if (product === null) {
      return res
        .status(404)
        .send(
          this.#validateData(false, { product: null }, "Product can not empty")
        );
    }
    return res
      .status(statusCode)
      .send(this.#validateData(true, { product: product }, null));
  }

  #validateData(isSuccess, data, err) {
    if (isSuccess) {
      return { status: "Success", data: data };
    } else {
      return { status: "Failed", message: err };
    }
  }
}

module.exports = ProductHandler;
