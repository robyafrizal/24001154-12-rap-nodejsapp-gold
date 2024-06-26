const sql = require("../config/postgres");

class CategoryRepository {
  constructor() {}

  async getAll() {
    const getCategories = await sql`SELECT * FROM categories`;
    return getCategories;
  }

  async getById(id) {
    const getIdCategory =
      await sql`SELECT id, name, code FROM categories WHERE id=${id} is not null`;
    return getIdCategory;
  }
  async create(category) {
    const createCategory =
      await sql`INSERT INTO categories(name, code) VALUES(${category.name}, ${category.code})`;
    return createCategory;
  }
  async update(category) {
    const updateCategory =
      await sql`UPDATE categories SET id = ${category.id}, name = ${category.name}, code = ${category.code} WHERE id = ${category.id};`;
    return updateCategory;
  }

  async delete(id) {
    const deleteCategory =
      await sql`DELETE FROM categories WHERE id=${id} RETURNING id;`;
    return deleteCategory;
  }
}

//---------------------------------------------
// const categories = require("../../db/categories.json");

// class CategoryRepository {
//   constructor() {
//     this.categories = categories;
//   }

//   getAll() {
//     return this.categories;
//   }

//   // getCode(category) {
//   //   for (let i = 0; i < this.categories.length; i++) {
//   //     if (this.categories[i].code === category.code) {
//   //       return this.categories[i];
//   //     }
//   //   }
//   // }

//   create(category) {
//     // return this.categories.push(category);

//     const isCategory = this.categories.find(
//       (item) => item.name === category.name
//     );
//     if (!isCategory) {
//       this.categories.push(category);
//       return { data: category, message: "Data berhasil ditambahkan" };
//     } else {
//       return { data: null, message: "Data sudah ada" };
//     }
//   }
// }

module.exports = CategoryRepository;
