class ProductService {
  constructor(ProductRepository, UserRepository) {
    this.ProductRepository = ProductRepository;
    this.UserRepository = UserRepository;
  }

  getAll() {
    const products = this.ProductRepository.getAll();
    const users = this.UserRepository.getAll();

    return products.map((product) => {
      const user = users.find((usr) => usr.email === product.user_email);
      if (user) {
        return {
          name: product.name,
          price: product.price,
          user: {
            name: user.name,
            email: user.email,
          },
        };
      }
      return products;
    });
  }

  getEmail(email) {
    const product = this.ProductRepository.getEmail(email);

    if (product === undefined) {
      return null;
    } else {
      return product;
    }
  }

  create(product) {
    const products = this.ProductRepository.create(product);
    return products;
  }
}

module.exports = ProductService;
