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

  const apiKey = req.headers['x-api-key'];
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

  try {
    await Kandidat.create({
      nama,
      pengalaman,
      kinerja,
      pendidikan,
      sertifikasi,
      kepemimpinan,
      lamaBekerja,
      softSkill,
      disiplin,
      hasilRekomendasi: jabatan,
      apiKey
    });

    res.json({ jabatan });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menyimpan data' });
  }
};

exports.riwayatRekomendasi = async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const { nama, tanggalMulai, tanggalAkhir } = req.query;

  // Bangun query dasar
  const query = { apiKey };

  if (nama) {
    query.nama = { $regex: nama, $options: 'i' }; // filter nama (case-insensitive)
  }

  if (tanggalMulai && tanggalAkhir) {
    query.createdAt = {
      $gte: new Date(tanggalMulai),
      $lte: new Date(tanggalAkhir)
    };
  }

  try {
    const riwayat = await Kandidat.find(query).sort({ createdAt: -1 });
    res.json(riwayat);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil riwayat', error: err.message });
  }
};

