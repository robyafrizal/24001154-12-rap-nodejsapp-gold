"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "Ryan",
        email: "ryan@gmail.com",
        password: "ryan123",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Roby",
        email: "roby@gmail.com",
        password: "roby123",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Afrizal",
        email: "afrizal@gmail.com",
        password: "afrizal123",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Palmendha",
        email: "palmendha@gmail.com",
        password: "palmendha123",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
