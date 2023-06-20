const fs = require('fs').promises;
const crypto = require('crypto');
const path = require('path');

const realPath = path.resolve(__dirname, '..', 'talker.json');

const readFile = async () => {
  try {
    const response = await fs.readFile(realPath, 'utf-8');
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.error(`message: ${error}`);
  }
};

const writeFile = async (updateData) => {
  try {
    await fs.writeFile('src/talker.json', updateData);
  } catch (error) {
    console.error(`message: ${error}`);
  }
};

const generateRandomId = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readFile,
  writeFile,
  generateRandomId,
};
