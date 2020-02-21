'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    species_id: DataTypes.INTEGER,
    age_id: DataTypes.INTEGER,
    breeder_id: DataTypes.INTEGER
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
  };
  return pet;
};