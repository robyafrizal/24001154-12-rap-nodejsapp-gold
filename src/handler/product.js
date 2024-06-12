class ProductHandler {
  constructor(ProductService) {
    this.ProductService = ProductService;

    this.getAll = this.getAll.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.create = this.create.bind(this);
  }

  getAll(req, res) {
    const products = this.ProductService.getAll();

    res
      .status(200)
      .send(this.#validateProduct(true, { products: products }, null));
  }

  getEmail(req, res) {
    const email = req.params.email;
    const product = this.ProductService.getEmail(email);

    let statusCode = 200;
    if (product === null) {
      statusCode = 404;
    }

    if (statusCode === 404) {
      res
        .status(statusCode)
        .send(this.#validateProduct(false, null, "Product not found"));
    } else if (statusCode === 200) {
      res
        .status(statusCode)
        .send(this.#validateProduct(true, { product: product }, null));
    } else {
      res
        .status(statusCode)
        .send(this.#validateProduct(false, null, "Data empty"));
    }
  }

  create(req, res) {
    const product = req.body;
    const isProduct = this.ProductService.getEmail(product.user_email);

    let statusCode = 200;
    if (product === null) {
      statusCode = 404;
    }
    if (isProduct) {
      res
        .status(400)
        .send(this.#validateProduct(false, null, "Product already exist"));
    } else if (statusCode === 200) {
      res
        .status(statusCode)
        .send(this.#validateProduct(true, { product: product }, null));
    } else {
      res
        .status(statusCode)
        .send(this.#validateProduct(false, null, "Data empty"));
    }
  }

  #validateProduct(isSuccess, data, err) {
    if (isSuccess) {
      return { status: "Success", data: data };
    } else {
      return { status: "Failed", message: err };
    }
  }
}

module.exports = ProductHandler;
