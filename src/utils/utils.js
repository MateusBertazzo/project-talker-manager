const fs = require('fs').promises;

const path = require('path')

const realPath = path.resolve(__dirname, '..', 'talker.json')

const readFile = async () => {
  const response = await fs.readFile(realPath, 'utf-8');
  const data = JSON.parse(response)
  return data;
};

module.exports = {
  readFile,
}
