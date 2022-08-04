const { requestResponse } = require("../utils");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretToken = process.env.TOKEN_SECRET;
let response;

const create = async (data) => {
  const user = await userModel.findOne({ email: data.email });
  if (user)
    return (response = {
      ...requestResponse.unprocessable_entity,
      msg: "E-mail sudah digunakan",
    });
  const salt = 10;
  const hashedPassword = await bcrypt.hash(data.password, salt);
  const obj = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
  };
  await userModel.create(obj);
  return (response = { ...requestResponse.success, user: obj.username });
};

const find = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user)
    return (response = { ...requestResponse.not_found, msg: "User not found" });

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) return (response = { ...requestResponse.unauthorized });

  const token = await jwt.sign({ email, password }, secretToken);
  return (response = {
    ...requestResponse.success,
    data: {
      username: user.username,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      token,
    },
  });
};
module.exports = { create, find };
