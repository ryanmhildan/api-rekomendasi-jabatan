const Kandidat = require('../models/Kandidat');

exports.rekomendasiJabatan = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  let jabatan = 'Staff Umum';

  if (
    data.pendidikan === 'IT' &&
    data.pengalaman >= 3 &&
    data.kinerja >= 80 &&
    data.kepemimpinan &&
    data.disiplin >= 75
  ) {
    jabatan = 'Lead Developer';
  } else if (
    data.pendidikan === 'Manajemen' &&
    data.kepemimpinan &&
    data.pengalaman >= 5 &&
    data.lamaBekerja >= 4
  ) {
    jabatan = 'Manajer Operasional';
  } else if (
    data.sertifikasi.includes('Project Management') &&
    data.softSkill.includes('Komunikasi') &&
    data.kinerja >= 70
  ) {
    jabatan = 'Koordinator Proyek';
  } else if (
    data.pendidikan === 'Teknik' &&
    data.pengalaman >= 2 &&
    data.kinerja >= 60
  ) {
    jabatan = 'Teknisi Senior';
  }

  await Kandidat.create({ ...data, userId, hasilRekomendasi: jabatan });

  res.json({ jabatan });
};

exports.histori = async (req, res) => {
  const histori = await Kandidat.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(histori);
};
