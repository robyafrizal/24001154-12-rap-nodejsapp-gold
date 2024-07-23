"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("orders", [
      {
        name: "Smartphone",
        status: "Delivered",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tablet",
        status: "Delivered",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Laptop",
        status: "Delivered",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Handphone",
        status: "Delivered",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("orders", null, {});
  },
};
