'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ages', [{
        age:'Teen',  
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        age:'Adult', 
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
