
# 🧠 API Rekomendasi Jabatan

Platform **microservice** berbasis **Node.js + Docker** untuk memberikan **rekomendasi jabatan** berdasarkan data kandidat. Autentikasi dilakukan menggunakan **API Key**.

---

## 🚀 Arsitektur Sistem

- 🐳 **Docker & Docker Compose** — untuk orkestrasi dan deployment
- 🔀 **NGINX** — berfungsi sebagai API Gateway
- 🧩 **Microservices**:
  - `auth-service` — menghasilkan dan mengelola API Key
  - `rekomendasi-service` — menghitung dan menyimpan hasil rekomendasi jabatan
- 🗃️ **MongoDB** — menyimpan data kandidat dan histori rekomendasi

---

## 📦 Endpoint API

### 🔐 AUTH SERVICE

#### `GET /auth/generate-key`

- **Deskripsi**: Menghasilkan API Key unik yang digunakan untuk mengakses layanan rekomendasi.
- **Respons**:
  ```json
  {
    "apiKey": "xxxxxxxxxxxxxxxxxx"
  }
  ```

---

### 🧠 REKOMENDASI SERVICE

> Semua endpoint pada layanan ini membutuhkan header `x-api-key` dengan API Key yang valid.

#### `POST /rekomendasi/hitung`

- **Deskripsi**: Menghitung rekomendasi jabatan berdasarkan input data kandidat.
- **Header**:
  ```
  x-api-key: <API_KEY>
  ```
- **Body JSON**:
  ```json
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
  ```
- **Respons**:
  ```json
  {
    "jabatan": "Lead Developer"
  }
  ```

---

#### `GET /rekomendasi/riwayat`

- **Deskripsi**: Melihat histori hasil rekomendasi berdasarkan API Key.
- **Query Opsional**:
  - `nama`: Filter berdasarkan nama kandidat
  - `tanggalMulai`, `tanggalAkhir`: Filter berdasarkan rentang tanggal (format `YYYY-MM-DD`)
- **Contoh**:
  ```
  GET /rekomendasi/riwayat?nama=Budi&tanggalMulai=2025-06-01&tanggalAkhir=2025-06-30
  ```
- **Respons**:
  ```json
  [
    {
      "nama": "Budi",
      "hasilRekomendasi": "Lead Developer",
      ...
    }
  ]
  ```

---

## ⚙️ Menjalankan di Lokal

1. Jalankan perintah:
   ```bash
   docker-compose up --build
   ```

2. Akses layanan melalui browser atau Postman:

   - 🔑 Generate API Key:  
     [http://localhost:8080/auth/generate-key](http://localhost:8080/auth/generate-key)

   - 🧠 Hitung Rekomendasi:  
     `POST` [http://localhost:8080/rekomendasi/hitung](http://localhost:8080/rekomendasi/hitung)

   - 📊 Cek Riwayat:  
     `GET` [http://localhost:8080/rekomendasi/riwayat](http://localhost:8080/rekomendasi/riwayat)

---

## 📁 Struktur Folder

```
api-rekomendasi-jabatan/
├── api-gateway/           # NGINX sebagai API Gateway
├── auth-service/          # Microservice untuk API Key
├── rekomendasi-service/   # Microservice untuk menghitung jabatan
├── docker-compose.yml     # File konfigurasi Docker Compose
└── README.md              # Dokumentasi proyek
```

---

## 🛠️ Teknologi yang Digunakan

- Node.js
- Express.js
- Docker & Docker Compose
- MongoDB
- NGINX
