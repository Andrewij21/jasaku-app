require("dotenv").config();
const route = require("express").Router();
const userRoute = require("./authRouter");
route.use("/auth", userRoute);
route.get("/", (req, res) => {
  res.send("helloworld");
});
module.exports = route;
