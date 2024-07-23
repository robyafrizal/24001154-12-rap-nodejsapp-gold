"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("items", [
      {
        name: "Smartphone Oppo",
        price: 750000,
        user_id: 4,
        order_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tablet Samsung",
        price: 2750000,
        user_id: 2,
        order_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Laptop Mac",
        price: 3750000,
        user_id: 3,
        order_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Handphone Xiaomi",
        price: 950000,
        user_id: 1,
        order_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("items", null, {});
  },
};
