const categories = require("../../db/categories.json");

class CategoryRepository {
  constructor() {
    this.categories = categories;
  }

  getAll() {
    return this.categories;
  }

  // getCode(category) {
  //   for (let i = 0; i < this.categories.length; i++) {
  //     if (this.categories[i].code === category.code) {
  //       return this.categories[i];
  //     }
  //   }
  // }

  create(category) {
    // return this.categories.push(category);

    const isCategory = this.categories.find(
      (item) => item.name === category.name
    );
    if (!isCategory) {
      this.categories.push(category);
      return { data: category, message: "Data berhasil ditambahkan" };
    } else {
      return { data: null, message: "Data sudah ada" };
    }
  }
}

module.exports = CategoryRepository;
