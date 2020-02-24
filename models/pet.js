'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    gender: DataTypes.ENUM(["Male","Female"]),
    species_id: DataTypes.INTEGER,
    age: DataTypes.ENUM(["Adult","Teen"]), // enum
    user_id: DataTypes.INTEGER,
    about: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
    pet.belongsTo(models.user, {
      foreignKey: "user_id"
    });

    pet.belongsTo(models.species, {
      foreignKey: "species_id",
      as: "species"
    });
  };
  return pet;
};