'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {   
      return queryInterface.bulkInsert('users', [{
        name:'Jhon Doe',
        email: 'John Doe@test.com',
        password: '12345',
        phone:'082197965542',
        address:'Jl.loks',    
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name:'Spiderman',
        email: 'spiderman@gmail.com',
        password: 'lovespiderman',
        phone:'082197923542',
        address:'Jl.New York',    
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {});
  }
};
