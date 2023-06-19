const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const MIN_LEN_TOKEN = 16;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length < MIN_LEN_TOKEN || typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const MIN_LEN_NAME = 3;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < MIN_LEN_NAME) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const MIN_AGE = 18;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < MIN_AGE || typeof age !== 'number') {
    return res
      .status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }

  next();
};
module.exports = {
  verifyAuthorization,
  validateName,
  validateAge,
};