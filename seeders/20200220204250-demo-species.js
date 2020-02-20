'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('species', [{
        name:'Dog',   
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name:'Cat',
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
