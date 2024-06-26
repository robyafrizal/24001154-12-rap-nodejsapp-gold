class CategoryService {
  constructor(CategoryRepository) {
    this.CategoryRepository = CategoryRepository;
  }

  async getAll() {
    const categories = await this.CategoryRepository.getAll();
    return categories;
  }
  async getById(id) {
    const categoryById = await this.CategoryRepository.getById(id);
    if (categoryById == false) {
      return { message: "Category not found", statusCode: 400 };
    } else {
      return {
        categoryById: categoryById,
        message: "Get category by id success",
        statusCode: 200,
      };
    }
  }
  async create(category) {
    const categories = await this.CategoryRepository.getAll();
    const categoryCreate = await this.CategoryRepository.create(category);

    if (!category.name || !category.code) {
      return { message: "Payload can not empty", statusCode: 400 };
    } else {
      if (category.name !== categories[categories.length - 1].name) {
        return {
          category: category,
          message: "Category created success",
          statusCode: 200,
        };
      } else {
        return { message: "Category already created", statusCode: 400 };
      }
    }
  }

  async update({ id, name, code }) {
    const updateCategory = await this.CategoryRepository.update({
      id,
      name,
      code,
    });
    const categoryNotNull = await this.CategoryRepository.getById(id);
    if (id == categoryNotNull[categoryNotNull.length - 1].id) {
      return {
        updateCategory: { name, code },
        message: "Update category success ",
        statusCode: 200,
      };
    }
    return { message: "Category not found", statusCode: 400 };
  }

  async delete(id) {
    const deleteCategory = await this.CategoryRepository.delete(id);
    if (deleteCategory == false) {
      return { message: "Category not found", statusCode: 400 };
    } else {
      return {
        deleteCategory: deleteCategory,
        message: "Delete category success",
        statusCode: 200,
      };
    }
  }
}

// class CategoryService {
//   constructor(CategoryRepository) {
//     this.CategoryRepository = CategoryRepository;
//   }

//   getAll() {
//     const categories = this.CategoryRepository.getAll();
//     return categories;
//   }
//   // getCode(category) {
//   //   const categories = this.CategoryRepository.getCode(category);
//   //   return categories;
//   // }
//   create(category) {
//     return this.CategoryRepository.create(category);
//   }
// }

module.exports = CategoryService;
