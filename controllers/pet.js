const models = require("../models");
const Pet = models.pet;
const User = models.user;
const Species = models.species;

exports.index = async (req, res) => {
  try {
    const pet = await Pet.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id","name", "address", "phone"]
        },
        {
          model: Species,
          as: "species",
          attributes: ["id","name"]
        }
      ],
      attributes: { exclude: ["user_id", "species_id"] }
    });
    res.status(200).send({ message: "success", data: pet });
  } catch (err) {
    console.log(err);
  }
};

exports.store = async (req, res) => {
  try {
    const { name, gender, species, age, user, about_pet, photo } = req.body;
    const speciesId = species.id;
    const breederId = user.id;
    if (req.user == breederId) {
      const pet = await Pet.create({
        name,
        gender,
        species_id: speciesId,
        age,
        breeder_id: breederId,
        about_pet,
        photo
      });

      const petId = pet.dataValues.id;
      const cPet = await Pet.findOne({
        where: { id: petId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "breeder", "address", "phone"]
          },
          {
            model: Species,
            as: "species",
            attributes: ["id", "name"]
          },
          {
            model: Age,
            as: "age",
            attributes: ["name"]
          }
        ],
        attributes: { exclude: ["breeder_id", "species_id"] }
      });
      res.status(200).send({ status: true, message: "success", data: cPet });
    } else {
      res.status(401).send({ status: false, message: "Authentication Failed" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { name, gender, species, age, user, about_pet, photo } = req.body;
    const speciesId = species.id;
    const breederId = user.id;
    const { id } = req.params;
    if (req.user == breederId) {
      const pet = await Pet.update(
        {
          name,
          gender,
          species_id: speciesId,
          age,
          breeder_id: breederId,
          about_pet,
          photo
        },
        { where: { id } }
      );

      const cPet = await Pet.findOne({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "breeder", "address", "phone"]
          },
          {
            model: Species,
            as: "species",
            attributes: ["id", "name"]
          },
          {
            model: Age,
            as: "age",
            attributes: ["name"]
          }
        ],
        attributes: { exclude: ["breeder_id", "species_id"] },
        where: { id }
      });
      res.status(200).send({ status: true, message: "success", data: cPet });
    } else {
      res.status(401).send({ status: false, message: "Authentication Failed" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.destroy({ where: { id } });
    res.status(200).send({ message: "delete success", id: pet });
  } catch (err) {
    console.log(err);
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findOne({
      where: { id }
    });
    res.status(200).send({ status: true, message: "success", data: pet });
  } catch (err) {
    console.log(err);
  }
};