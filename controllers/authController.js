const { requestResponse } = require("../utils");
const { create, find } = require("../services/user_services");

let response;
const register = async (req, res) => {
  try {
    const user = await create(req.body);

    response = { ...requestResponse.success, ...user };
  } catch (err) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};
const login = async (req, res) => {
  try {
    const user = await find(req.body);
    response = { ...requestResponse.success, user };
  } catch (err) {
    response = { ...requestResponse.server_error, err };
  }
  res.status(response.code).json(response);
};
module.exports = { register, login };
