module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.MASTER_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized. Invalid API key.' });
  }
  next();
};