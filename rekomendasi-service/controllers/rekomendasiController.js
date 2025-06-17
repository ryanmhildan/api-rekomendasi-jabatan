const Kandidat = require('../models/Kandidat');

exports.rekomendasiJabatan = async (req, res) => {
  const {
    nama,
    pengalaman,
    kinerja,
    pendidikan,
    sertifikasi,
    kepemimpinan,
    lamaBekerja,
    softSkill,
    disiplin
  } = req.body;

  const userId = req.user.id; // dari JWT (authMiddleware)

  // Logika rekomendasi
  let jabatan = 'Staff Umum';

  if (
    pendidikan === 'IT' &&
    pengalaman >= 3 &&
    kinerja >= 80 &&
    kepemimpinan &&
    disiplin >= 75
  ) {
    jabatan = 'Lead Developer';
  } else if (
    pendidikan === 'Manajemen' &&
    kepemimpinan &&
    pengalaman >= 5 &&
    lamaBekerja >= 4
  ) {
    jabatan = 'Manajer Operasional';
  } else if (
    sertifikasi.includes('Project Management') &&
    softSkill.includes('Komunikasi') &&
    kinerja >= 70
  ) {
    jabatan = 'Koordinator Proyek';
  } else if (
    pendidikan === 'Teknik' &&
    pengalaman >= 2 &&
    kinerja >= 60
  ) {
    jabatan = 'Teknisi Senior';
  }

  // Simpan histori
  await Kandidat.create({
    userId,
    nama,
    pengalaman,
    kinerja,
    pendidikan,
    sertifikasi,
    kepemimpinan,
    lamaBekerja,
    softSkill,
    disiplin,
    hasilRekomendasi: jabatan
  });

  res.json({ jabatan });
};
