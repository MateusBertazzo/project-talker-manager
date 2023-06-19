const express = require('express');
const { readFile, writeFile } = require('../utils/utils');

const routeTalker = express.Router();

routeTalker.get('/', async (req, res) => {
  const data = await readFile();

  if (data.length === 0) {
    return res.status(200).json([]);
  }

  return res.status(200).json(data);
});

routeTalker.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readFile();

  const talkerId = data.find((talker) => talker.id === Number(id));

  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talkerId);
});

routeTalker.post('/', async (req, res) => {
  const talkers = await readFile();

  const id = talkers.length + 1;

  const newTalker = { id, ...req.body };

  talkers.push(newTalker);

  await writeFile(JSON.stringify(talkers, null, 2));
  return res.status(201).json({ talkers });
});

module.exports = routeTalker;