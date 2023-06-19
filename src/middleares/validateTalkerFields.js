const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const LEN_TOKEN = 16;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== LEN_TOKEN) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  if (typeof authorization !== 'string') {
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
  if (age < MIN_AGE) {
    return res
      .status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  if (!Number.isInteger(age)) {
    return res
      .status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (talk.rate === 0) {
  return res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  // REGEX ALEATORIO DA INTERNET
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  const verifydate = dateRegex.test(watchedAt);

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!verifydate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate)) {
    return res
    .status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  if (rate < 1 || rate > 5) {
    return res
    .status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = {
  verifyAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};