const products = require("../../db/products.json");

class ProductRepository {
  constructor() {
    this.products = products;
  }

  getAll() {
    return this.products;
  }

  getEmail(email) {
    return this.products.find((product) => product.user_email === email);
  }

  create(product) {
    return new Promise((resolve, reject) => {
      const isProduct = this.getEmail(product.user_email);
      if (isProduct) {
        reject("Product has created");
      } else {
        products.push(product);
        resolve("Create product success");
      }
    });
  }
}

module.exports = ProductRepository;
