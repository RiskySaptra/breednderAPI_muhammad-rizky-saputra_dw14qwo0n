"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "lovespiderman";
module.exports = {
  up: async (queryInterface, Sequelize) => {   
      try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(myPlaintextPassword, salt);
        return queryInterface.bulkInsert('users', [
          {
            breeder:'Spiderman',
            email: 'spiderman@gmail.com',
            password: 'lovespiderman',
            phone:hash,
            address:'Jl.New York',    
            createdAt:new Date(),
            updatedAt:new Date()
          }], {});
      } catch (error) {
        
      }
        
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {});
  }
};
