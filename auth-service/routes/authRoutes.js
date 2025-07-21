const express = require('express');
const router = express.Router();
const generateApiKey = require('../utils/generateApiKey');
const ApiKey = require('../models/ApiKey'); // pakai nama model yang benar

router.get('/generate-key', async (req, res) => {
  const apiKey = generateApiKey();

  try {
    const newKey = new ApiKey({ apiKey });
    await newKey.save();
    res.json({ apiKey });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menyimpan API key', error: error.message });
  }
});

module.exports = router;
