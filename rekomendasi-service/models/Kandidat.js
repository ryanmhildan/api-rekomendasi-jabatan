const mongoose = require('mongoose');

const kandidatSchema = new mongoose.Schema({
  nama: String,
  pengalaman: Number,
  kinerja: Number,
  pendidikan: String,
  sertifikasi: [String],
  kepemimpinan: Boolean,
  lamaBekerja: Number,
  softSkill: [String],
  disiplin: Number,
  hasilRekomendasi: String,
  apiKey: String, // Tambahkan ini
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Kandidat', kandidatSchema);
