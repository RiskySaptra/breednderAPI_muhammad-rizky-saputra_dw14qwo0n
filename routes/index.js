const express = require("express");
const router = express.Router();

const { login } = require("../controllers/user");
const { register } = require("../controllers/user");

router.post("/login", login);
router.post("/register", register);

module.exports = router;