const products = require("../../db/products.json");

class ProductRepository {
  constructor() {
    this.products = products;
  }

  getAll() {
    return this.products;
  }

  // getEmail(email) {
  //   return this.products.find((product) => product.user_email === email);
  // }

  create(product) {
    const isProduct = this.products.find((item) => item.name === product.name);
    if (!isProduct) {
      return this.products.push(product);
    }
    return "Product already exist";
  }

  // create(product) {
  //   return new Promise((resolve, reject) => {
  //     const isProduct = this.getEmail(product.user_email);
  //     if (isProduct) {
  //       reject("Product has created");
  //     } else {
  //       products.push(product);
  //       resolve("Create product success");
  //     }
  //   });
  // }
}

module.exports = ProductRepository;
