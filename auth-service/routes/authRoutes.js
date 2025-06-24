const express = require('express');
const router = express.Router();
const generateApiKey = require('../utils/generateApiKey');
const ApiKey = require('../models/ApiKey');

router.get('/generate-key', async (req, res) => {
  const key = generateApiKey();

  try {
    const saved = await ApiKey.create({ key });
    res.json({ apiKey: saved.key });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menyimpan API key.' });
  }
});

module.exports = router;
