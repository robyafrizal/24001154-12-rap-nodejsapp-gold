class CategoryService {
  constructor(CategoryRepository) {
    this.CategoryRepository = CategoryRepository;
  }

  getAll() {
    const categories = this.CategoryRepository.getAll();
    return categories;
  }
  // getCode(category) {
  //   const categories = this.CategoryRepository.getCode(category);
  //   return categories;
  // }
  create(category) {
    return this.CategoryRepository.create(category);
  }
}

module.exports = CategoryService;
