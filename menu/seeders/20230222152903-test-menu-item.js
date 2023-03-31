'use strict';

var now = new Date().toISOString()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("MenuItems", [{
      name: "Gulaš",
      price: 4.99,
      quantity: "1 plate",
      createdAt: now,
      updatedAt: now
    },
    {
      name: "Sprite",
      price: 1.55,
      quantity: "0.33L",
      createdAt: now,
      updatedAt: now
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MenuItems', null, {});
  }
};
