const sql = require("../config/postgres");

class ProductRepository {
  constructor() {}

  async getAll() {
    const getProducts = await sql`SELECT * from products`;
    return getProducts;
  }

  async getById(id) {
    const getIdProduct =
      await sql`SELECT id, name, price FROM products WHERE id=${id}`;
    return getIdProduct;
  }
  async create(product) {
    const createProduct =
      await sql`INSERT INTO products(name, price) VALUES(${product.name}, ${product.price})`;
    return createProduct;
  }
  async update(product) {
    const updateProduct =
      await sql`UPDATE products SET id = ${product.id}, name = ${product.name}, code = ${product.price} WHERE id = ${product.id};`;
    return updateProduct;
  }

  async delete(id) {
    const deleteProduct =
      await sql`DELETE FROM products WHERE id=${id} RETURNING id;`;
    return deleteProduct;
  }
}

// const products = require("../../db/products.json");

// class ProductRepository {
//   constructor() {
//     this.products = products;
//   }

//   getAll() {
//     return this.products;
//   }

//   create(product) {
//     const isProduct = this.products.find((item) => item.name === product.name);
//     if (!isProduct) {
//       return this.products.push(product);
//     }
//     return "Product already exist";
//   }

//------------------------------------------------
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
// }

module.exports = ProductRepository;
