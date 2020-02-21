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
    pet.belongsTo(models.user, {
      foreignKey: "breeder_id",
      as: "user"
    });

    pet.belongsTo(models.species, {
      foreignKey: "species_id",
      as: "species"
    });
    
    pet.belongsTo(models.age, {
      foreignKey: "age_id",
      as: "age"
    });
  };
  return pet;
};