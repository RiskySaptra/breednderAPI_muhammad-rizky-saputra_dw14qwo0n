const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const { login } = require("../controllers/user");
const { register } = require("../controllers/user");

const PetController = require("../controllers/pet");

router.post("/login", login);
router.post("/register", register);

router.get("/pet", PetController.index);
router.get("/pet/:id", PetController.show);
router.post("/pet", auth, PetController.store);
router.put("/pet/:id", auth, PetController.update);
router.delete("/pet/:id", auth, PetController.destroy);



module.exports = router;