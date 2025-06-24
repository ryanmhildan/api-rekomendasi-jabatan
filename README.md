# 🧠 API Rekomendasi Jabatan

Platform microservice berbasis Node.js + Docker untuk merekomendasikan jabatan berdasarkan data kandidat. Autentikasi menggunakan API Key.

## 🚀 Arsitektur

- 🐳 Docker & Docker Compose
- 🔀 NGINX sebagai API Gateway
- 🧩 Microservices:
  - `auth-service`: menghasilkan dan mengelola API key
  - `rekomendasi-service`: menghitung dan menyimpan hasil rekomendasi jabatan
- 🗃️ MongoDB untuk penyimpanan data kandidat dan API key

---

## 📦 Endpoint API

### 🔐 AUTH SERVICE

#### `GET /auth/generate-key`

- **Deskripsi**: Menghasilkan API Key unik.
- **Respons**:
  ```json
  {
    "apiKey": "xxxxxxxxxxxxxxxxxx"
  }
  ```

# 🧠 REKOMENDASI SERVICE

# 🔑 Header wajib:

x-api-key: <API_KEY>

POST /rekomendasi/hitung
Deskripsi: Hitung jabatan berdasarkan data kandidat.

Body JSON:

{
"nama": "Budi",
"pengalaman": 5,
"kinerja": 85,
"pendidikan": "IT",
"sertifikasi": ["Project Management"],
"kepemimpinan": true,
"lamaBekerja": 4,
"softSkill": ["Komunikasi"],
"disiplin": 80
}
Respons:

{ "jabatan": "Lead Developer" }
GET /rekomendasi/riwayat
Deskripsi: Melihat histori rekomendasi berdasarkan API key.

Query Opsional:

nama: filter berdasarkan nama

tanggalMulai, tanggalAkhir: filter berdasarkan tanggal (format: YYYY-MM-DD)

Contoh:

GET /rekomendasi/riwayat?nama=Budi&tanggalMulai=2025-06-01&tanggalAkhir=2025-06-30
Respons:

[
{
"nama": "Budi",
"hasilRekomendasi": "Lead Developer",
...
}
]

⚙️ Menjalankan di Lokal

docker-compose up --build
Akses via browser / Postman:

Generate API key: http://localhost:8080/auth/generate-key

Hitung jabatan: POST http://localhost:8080/rekomendasi/hitung

Cek riwayat: GET http://localhost:8080/rekomendasi/riwayat

📁 Struktur Folder

api-rekomendasi-jabatan/
├── api-gateway/
├── auth-service/
├── rekomendasi-service/
├── docker-compose.yml
└── README.md
