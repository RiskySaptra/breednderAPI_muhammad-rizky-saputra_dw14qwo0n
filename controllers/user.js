const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const User = models.user;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    console.log(user)
  } catch (err) {
    console.log(err);
  }
};
exports.register = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err);
  }
};