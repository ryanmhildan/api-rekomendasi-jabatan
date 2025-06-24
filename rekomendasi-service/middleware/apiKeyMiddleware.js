const VALID_API_KEYS = ['123456789apikey'];

module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
    return res.status(401).json({ message: 'Unauthorized. Invalid API key.' });
  }
  next();
};
