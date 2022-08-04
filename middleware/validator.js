const { body, validationResult } = require("express-validator");
const validationRules = [
  body("username").exists({ checkFalsy: true, checkNull: true }),
  body("email").isEmail().withMessage("Invalid E-mail"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password at least 6 character"),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { validationRules, validate };
