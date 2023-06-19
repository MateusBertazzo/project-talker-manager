const express = require('express');
const { validateEmail, validatePassword } = require('../middleares/validateLoginFields');

const { generateRandomId } = require('../utils/utils');

const loginRoute = express.Router();

loginRoute.post('/', validateEmail, validatePassword, async (req, res) => {
  const token = generateRandomId();

  res.status(200).json({ token });
});

module.exports = loginRoute;