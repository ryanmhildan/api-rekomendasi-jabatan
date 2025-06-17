require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rekomRoutes = require('./routes/rekomendasiRoutes');

const app = express();
app.use(express.json());
app.use('/rekomendasi', rekomRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5001, () => console.log('Rekomendasi Service running')))
  .catch(err => console.log(err));
