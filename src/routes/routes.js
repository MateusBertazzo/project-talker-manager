const express = require('express');
const { readFile } = require('../utils/utils')

const route = express.Router();

route.get('/', async (req, res) => {
  const data = await readFile()

  if(data.length === 0) {
    return res.status(200).json([]);
  }

  return res.status(200).json(data);
})

module.exports = route;