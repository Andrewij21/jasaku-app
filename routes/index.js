require("dotenv").config();
const route = require("express").Router();
const userRoute = require("./authRouter");
route.use("/auth", userRoute);

module.exports = route;
