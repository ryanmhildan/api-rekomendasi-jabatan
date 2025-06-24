const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const rekomendasiRoutes = require('./routes/rekomendasiRoutes');
app.use('/rekomendasi', rekomendasiRoutes);

mongoose.connect('mongodb://mongo:27017/rekomendasi-service')
  .then(() => {
    console.log('Rekomendasi DB Connected');
    app.listen(process.env.PORT, () => console.log(`Rekomendasi Service running on ${process.env.PORT}`));
  })
  .catch((err) => console.error('DB error:', err));
