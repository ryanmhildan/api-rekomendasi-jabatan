const mongoose = require('mongoose');
const ApiKey = require('../models/ApiKey'); // pakai model yang sama

module.exports = async (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey) {
    return res.status(401).json({ message: 'API key tidak ditemukan di header' });
  }

  try {
    const existing = await ApiKey.findOne({ apiKey });
    if (!existing) {
      return res.status(401).json({ message: 'API key tidak valid' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Terjadi kesalahan saat verifikasi API key' });
  }
};
