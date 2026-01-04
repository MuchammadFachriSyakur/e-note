# Sistem Pencatatan Penjualan Konter Pulsa 📱🧾

Aplikasi web sederhana untuk membantu pemilik konter pulsa mencatat transaksi penjualan harian secara digital.  
Dirancang untuk menggantikan pencatatan manual agar **lebih rapi, cepat, dan tidak mudah hilang**.

🔗 **Live Demo**:

---

## 📌 Latar Belakang

Banyak konter pulsa kecil masih mencatat transaksi menggunakan buku atau mengandalkan ingatan.  
Hal ini menyebabkan:

- Data transaksi mudah hilang
- Sulit menghitung total pendapatan harian
- Proses pencatatan memakan waktu

Aplikasi ini dibuat sebagai **solusi sederhana dan realistis** untuk kebutuhan tersebut.

---

## 🎯 Tujuan Proyek

- Membantu pemilik konter mencatat transaksi pulsa
- Menampilkan total penjualan harian secara otomatis
- Menyimpan data transaksi secara lokal di browser

---

## 👤 Target Pengguna

- Pemilik konter pulsa kecil
- Penjaga konter  
  (Pengguna non-teknis)

---

## ✨ Fitur Utama

- ➕ Tambah transaksi penjualan pulsa
- 📄 Daftar riwayat transaksi
- 📆 Tanggal & jam transaksi
- 🔍 Filter transaksi berdasarkan tanggal
- 📊 Total penjualan & jumlah transaksi harian
- 💾 Penyimpanan data menggunakan LocalStorage
- 🎨 Tampilan mobile-friendly dengan icon SVG inline

---

## 🛠️ Tech Stack

- **HTML5** — struktur halaman
- **CSS3** — layout & styling (mobile-first)
- **JavaScript (Vanilla)** — logic aplikasi
- **LocalStorage** — penyimpanan data lokal
- **SVG Inline** — icon ringan & scalable

---

## 🧠 Desain Sistem (Sesuai SRS)

### Struktur Data Transaksi

```js
{
  id: Number,
  tanggal: Date,
  nominal_pulsa: String,
  harga_jual: Number
}
```
