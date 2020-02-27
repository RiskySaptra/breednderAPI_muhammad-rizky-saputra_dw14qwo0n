const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const User = models.user;
const Pet = models.pet;

exports.autoAuth = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user } });
    if (user) {
      res.json({
        success: true,
        message: "Login success",
        data: { id: user.id, email: user.email, token: req.token }
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid login credentials. Please relogin",
        data: {}
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid login credentials. please relogin",
      data: {}
    });
  }
};

exports.index = async (req, res) => {
  try {
    const user = await User.findAll({attributes: { exclude: ["password", "role", "status"] }});
    if (user && user.length > 0) { // Array Species
      res.status(401).json({success: true,message: "Load User success",data: user});
    } else {
      res.status(401).json({success: false,message: "User Table Empty",data: {}});
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({success: false,message: "User Table Empty",data: {}
    });
  }
};
exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password", "role", "status"] }
    });
    if (user) {
      res.json({
        success: true,
        message: "Load user success",
        data: user
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User does not exist!"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load user fail",
      data: {}
    });
  }
};
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body; // front end
//     const user = await User.findOne({ where: { email } });
//     if (user) {
//       const result = await bcrypt.compare(password, user.password);
//       if (result) {
//         const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
//         res.send({ email, token });
//       } else {
//         res.status(401).send({ message: "Invalid password" });
//       }
//     }else{
//       res.status(401).send({ message: "Invalid email" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        res.json({
          success: true,
          message: "Login success",
          data: { id: user.id, email: user.email, token }
        });
      } else {
        //invalid email

        res.status(401).json({
          success: false,
          message: "Invalid login credentials. please try again",
          data: {}
        });
      }
    } else {
      //invalid password
      res.status(401).json({
        success: false,
        message: "Invalid login credentials. please try again",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "Login failed, something went wrong",
      data: {}
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { email } = req.body;
    const { pet } = req.body;
    const hash = await bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    const check = await User.findOne({ where: { email } });
    if (check) {
      res.status(401).send({ status: false, message: "Email Already Taken" });
    } else {
      const user = await User.create(req.body);
      const data_pet = {
        user_id: user.id,
        name: pet.name,
        gender: pet.gender,
        species_id: pet.species,
        age: pet.age,
        about: pet.about,
        photo: pet.photo
      };
      // console.log(pet);
      
      const petReg = await Pet.create(data_pet);
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
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const check_user = await User.findOne({ where: { id } });
    if (check_user) {
      if (check_user.id === req.user) {
        const userq = await User.update(req.body, {
          where: { id }
        });
        if (userq.length > 0 && userq[0]) {
          const user = await User.findOne({
            where: { id },
            attributes: { exclude: ["password", "level", "email", "id"] }
          });

          res.json({
            success: true,
            message: "Update User success",
            data: user
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Cant update because user does not exist",
            data: {}
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: "Not authorized",
          data: {}
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Not authorized",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "update User fail",
      data: {}
    });
  }
};
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    if (user) {
      res.json({
        success: true,
        message: "delete user success",
        data: { id }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Cant delete because user does not exist",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "delete user fail",
      data: {}
    });
  }
};
