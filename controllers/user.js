const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const User = models.user;
const Pet = models.pet;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // front end
    const user = await User.findOne({ where: { email } });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        res.send({ email, token });
      } else {
        res.status(401).send({ message: "Invalid password" });
      }
    }else{
      res.status(401).send({ message: "Invalid email" });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.register = async (req, res) => {
  try {
    const password = await bcrypt.hashSync(req.body.password, 10);
    const { breeder, email, phone, address, pet } = req.body; // front end
    const { name, gender } = pet;
    const species_id = pet.species.id;
    const age_id = pet.age.id;
    

    const check = await User.findOne({ where: { email } });
    if (check) {
      res.status(401).send({ status: false, message: "Email Already Taken" });
    } else {
      const user = await User.create({
        breeder,
        email,
        password,
        phone,
        address
      });
      const userId = user.dataValues.id;
      const petReg = await Pet.create({
        name,
        gender,
        species_id,
        age_id,
        breeder_id : userId
      });
      if (user && petReg) {
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        res
          .status(200)
          .send({ status: true, message: "Success", data : {email, token} });
      } else {
        res.status(401).send({ status: false, message: "Register Failed" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};