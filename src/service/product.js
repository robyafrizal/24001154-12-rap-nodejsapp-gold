class ProductService {
  constructor(ProductRepository, UserRepository, CategoryRepository) {
    this.ProductRepository = ProductRepository;
    this.UserRepository = UserRepository;
    this.CategoryRepository = CategoryRepository;
  }

  getAll() {
    const products = this.ProductRepository.getAll();
    const users = this.UserRepository.getAll();
    const categories = this.CategoryRepository.getAll();
    const result = [];

    for (let i = 0; i < products.length; i++) {
      const user = users.find((usr) => usr.email === products[i].user_email);
      const category = categories.find(
        (ctg) => ctg.code === products[i].category_code
      );
      const userProduct = {
        name: products[i].name,
        price: products[i].price,
        user: {
          name: user.name,
          email: user.email,
        },
        category: {
          name: category.name,
        },
      };
      result.push(userProduct);
    }
    console.log(result);
    return result;
  }
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

  // getEmail(email) {
  //   const product = this.ProductRepository.getEmail(email);

  create(product) {
    const products = this.ProductRepository.create(product);
    return products;

    // this.ProductRepository.create(product);
    // return "Success create product";
  }
}

module.exports = ProductService;
