"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "profile_picture", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });

    // Menempatkan kolom baru setelah kolom email
    // await queryInterface.sequelize.query(
    //   'ALTER TABLE "users" ADD COLUMN "profile_picture" AFTER "email";'
    // );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "profile_picture");
  },
};
