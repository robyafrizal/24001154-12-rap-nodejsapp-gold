class ProductService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }

  async getAll() {
    const products = await this.ProductRepository.getAll();
    return products;
  }
  async getById(id) {
    const productById = await this.ProductRepository.getById(id);
    if (productById == false) {
      return { message: "Product not found", statusCode: 400 };
    } else {
      return {
        productById: productById,
        message: "Get product by id success",
        statusCode: 200,
      };
    }
  }
  async create(product) {
    const products = await this.ProductRepository.getAll();
    const productCreate = await this.ProductRepository.create(product);

    if (!product.name || !product.code) {
      return { message: "Payload can not empty", statusCode: 400 };
    } else {
      if (product.name !== products[products.length - 1].name) {
        return {
          product: product,
          message: "Product created success",
          statusCode: 200,
        };
      } else {
        return { message: "Product already created", statusCode: 400 };
      }
    }
  }

  async update({ id, name, price }) {
    const updateProduct = await this.ProductRepository.update({
      id,
      name,
      price,
    });
    const productNotNull = await this.ProductRepository.getById(id);
    if (id == productNotNull[productNotNull.length - 1].id) {
      return {
        updateProduct: { name, price },
        message: "Update product success ",
        statusCode: 200,
      };
    }
    return { message: "Product not found", statusCode: 400 };
  }

  async delete(id) {
    const deleteProduct = await this.ProductRepository.delete(id);
    if (deleteProduct == false) {
      return { message: "Product not found", statusCode: 400 };
    } else {
      return {
        deleteProduct: deleteProduct,
        message: "Delete product success",
        statusCode: 200,
      };
    }
  }
}

//---------------------------------------------------
// class ProductService {
// constructor(ProductRepository, UserRepository, CategoryRepository) {
//   this.ProductRepository = ProductRepository;
//   this.UserRepository = UserRepository;
//   this.CategoryRepository = CategoryRepository;
// }

// getAll() {
//   const products = this.ProductRepository.getAll();
//   const users = this.UserRepository.getAll();
//   const categories = this.CategoryRepository.getAll();
//   const result = [];

//   for (let i = 0; i < products.length; i++) {
//     const user = users.find((usr) => usr.email === products[i].user_email);
//     const category = categories.find(
//       (ctg) => ctg.code === products[i].category_code
//     );
//     const userProduct = {
//       name: products[i].name,
//       price: products[i].price,
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//       category: {
//         name: category.name,
//       },
//     };
//     result.push(userProduct);
//   }
//   console.log(result);
//   return result;
// }

//--------------------------------------------------------
// getAll() {
//   const products = this.ProductRepository.getAll();
//   const users = this.UserRepository.getAll();
//   const categories = this.CategoryRepository.getAll();

//   return products.map((product) => {
//     const user = users.find((usr) => usr.email === product.user_email);
//     // const category = categories.find((ctgr) =>
//     //   product.name.includes(ctgr.name)
//     // );
//     const category = categories.find(
//       (ctgr) => ctgr.code === product.category_code
//     );
//     if (category) {
//       return {
//         name: product.name,
//         price: product.price,
//         user: {
//           name: user.name,
//           email: user.email,
//         },
//         category: {
//           name: category.name,
//         },
//       };
//     }
//     return products;
//   });
// }

// create(product) {
//   const products = this.ProductRepository.create(product);
//   return products;

// this.ProductRepository.create(product);
// return "Success create product";
// }
// }

module.exports = ProductService;
