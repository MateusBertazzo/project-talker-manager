const express = require('express');
const { readFile, writeFile } = require('../utils/utils');
const { 
  verifyAuthorization, 
  validateName, 
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middleares/validateTalkerFields');

const routeTalker = express.Router();

routeTalker.get('/', async (req, res) => {
  const data = await readFile();

  if (data.length === 0) {
    return res.status(200).json([]);
  }

  return res.status(200).json(data);
});

routeTalker.get('/search', verifyAuthorization, async (req, res) => {
  const { q } = req.query;

  const talkers = await readFile();

  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

  return res.status(200).json(filteredTalkers);
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

routeTalker.post('/', verifyAuthorization,
validateName, validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const talkers = await readFile();

  const id = talkers.length + 1;

  const newTalker = { id, ...req.body };

  talkers.push(newTalker);

  await writeFile(JSON.stringify(talkers, null, 2));
  return res.status(201).json(newTalker);
});

routeTalker.put('/:id', verifyAuthorization,
validateName, validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const { id } = req.params;

  const talkers = await readFile();

  const indexTalker = talkers.findIndex((talker) => talker.id === Number(id));

  if (indexTalker === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  const updateTalker = { id: Number(id), ...req.body };

  talkers[indexTalker] = updateTalker;

  await writeFile(JSON.stringify(talkers, null, 2));
  return res.status(200).json(updateTalker);
});

routeTalker.delete('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;

  const talkers = await readFile();
  const talkerIndice = talkers.findIndex((talker) => talker.id === Number(id));

  talkers.splice(talkerIndice, 1);

  await writeFile(JSON.stringify(talkers, null, 2));

  return res.status(204).json();
});

module.exports = routeTalker;