const route = require("express").Router();
const { register, login } = require("../controllers/authController");
const { validationRules, validate } = require("../middleware/validator");
route.post("/register", validationRules, validate, register);
route.post("/login", login);
module.exports = route;
