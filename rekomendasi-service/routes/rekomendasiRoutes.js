const express = require('express');
const router = express.Router();
const {
  rekomendasiJabatan,
  riwayatRekomendasi
} = require('../controllers/rekomendasiControllers');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

// Endpoint untuk mendapatkan rekomendasi
router.post('/', apiKeyMiddleware, rekomendasiJabatan);

// Endpoint untuk melihat riwayat rekomendasi berdasarkan API key
router.get('/riwayat', apiKeyMiddleware, riwayatRekomendasi);

module.exports = router;
