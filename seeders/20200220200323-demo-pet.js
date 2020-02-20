'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pets', [{
      name:'Jon Snow',
      gender: 'male',   
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name:'Mrs.Doug',
      gender: 'female',   
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {});
  }
};
