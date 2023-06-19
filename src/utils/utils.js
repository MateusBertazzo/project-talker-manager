const fs = require('fs').promises;
const crypto = require('crypto');
const path = require('path');

const realPath = path.resolve(__dirname, '..', 'talker.json');

const readFile = async () => {
  const response = await fs.readFile(realPath, 'utf-8');
  const data = JSON.parse(response);
  return data;
};

const writeFile = async (updateData) => {
  await fs.writeFile('src/talker.json', updateData);
};

const generateRandomId = () => crypto.randomBytes(8).toString('hex');
;

module.exports = {
  readFile,
  writeFile,
  generateRandomId,
};
