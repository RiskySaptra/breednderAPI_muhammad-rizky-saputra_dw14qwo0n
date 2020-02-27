const models = require("../models");
const Species = models.species;

exports.store = async (req, res) => {
  try {
    const species = await Species.create(req.body);
    if (species) {
      res.json({success: true,message: "Add species success", data: species
      });
    } else {
      res.status(401).json({success: false,message: "Add species failed",data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({success: false,message: "Add species failed",data: {}
    });
  }
};

exports.show = async (req, res) => {
    try {
      const species = await Species.findAll();
      res.status(200).json({message: "Load species success",data: species});     
    } catch (err) {
      console.log(err);
      res.status(401).json({success: false,message: "Species Table Empty",data: {}
      });
    }
  };