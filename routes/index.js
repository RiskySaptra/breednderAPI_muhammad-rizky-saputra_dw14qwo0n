const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const { login } = require("../controllers/user");
const { register } = require("../controllers/user");

const UserController = require("../controllers/user");
const SpeciesController = require("../controllers/species");
const PetController = require("../controllers/pet");
// Auth Login
router.post("/login", login);
router.post("/register", register);
// Users
router.get("/users", UserController. index);
router.get("/user/:id", UserController. show);
router.put("/user/:id", auth,UserController. update);
router.delete("/user/:id", auth,UserController. destroy);
// Species
router.post("/species",SpeciesController. store);
router.get("/species",SpeciesController. show);
// Pets
router.get("/pets", PetController.index);
router.get("/pet/:id", PetController.show);
router.post("/pet", auth, PetController.store);
router.put("/pet/:id", auth, PetController.update);
router.delete("/pet/:id", auth, PetController.destroy);



module.exports = router;