class ProductHandler {
  constructor(ProductService) {
    this.ProductService = ProductService;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    try {
      const products = await this.ProductService.getAll();
      return res.status(200).send(products);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  async getById(req, res) {
    try {
      const id = req.params.id;
      const productById = await this.ProductService.getById(id);
      return res.status(productById.statusCode).send(productById);
    } catch (error) {
      return res
        .status(productById.statusCode)
        .send({ message: error.message });
    }
  }
  async create(req, res) {
    try {
      const product = req.body;
      const productCreated = await this.ProductService.create(product);
      return res
        .status(productCreated.statusCode)
        .send({ product: productCreated, message: productCreated.message });
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
  async update(req, res) {
    try {
      const { id, name, price } = req.body;
      const updateProduct = await this.ProductService.update({
        id,
        name,
        price,
      });

      res
        .status(updateProduct.statusCode)
        .send({ users: updateProduct, message: updateProduct.message });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleteProduct = await this.ProductService.delete(id);
      res
        .status(deleteProduct.statusCode)
        .send({ message: deleteProduct.message });
    } catch (err) {
      res.status(deleteProduct.statusCode).send({ message: err.message });
    }
  }
}

//--------------------------------------------
// class ProductHandler {
//   constructor(ProductService) {
//     this.ProductService = ProductService;

//     this.getAll = this.getAll.bind(this);
//     this.create = this.create.bind(this);
//   }

//   getAll(req, res) {
//     const products = this.ProductService.getAll();

//     res.status(200).send({ message: products });

//     // res
//     //   .status(200)
//     //   .send(this.#validateData(true, { products: products }, null));
//   }

//   create(req, res) {
//     const product = req.body;
//     console.log(product);
//     if (!product.name) {
//       return res.status(400).send("Payload harus diisi");
//     }
//     const products = this.ProductService.create(product);

//     let statusCode = 200;
//     if (products === "Product already exist") {
//       return res
//         .status(400)
//         .send(
//           this.#validateData(false, { product: null }, "Product already exist")
//         );
//     } else if (product === null) {
//       return res
//         .status(404)
//         .send(
//           this.#validateData(false, { product: null }, "Product can not empty")
//         );
//     }
//     return res
//       .status(statusCode)
//       .send(this.#validateData(true, { product: product }, null));
//   }

//   #validateData(isSuccess, data, err) {
//     if (isSuccess) {
//       return { status: "Success", data: data };
//     } else {
//       return { status: "Failed", message: err };
//     }
//   }
// }

module.exports = ProductHandler;
