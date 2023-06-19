const express = require('express');

const { generateRandomId } = require('../utils/utils');

const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
  const token = generateRandomId();

  res.status(200).json({ token });
});

module.exports = loginRoute;