# Aplikasi Booking Lapangan

Aplikasi ini dibuat untuk mempermudah proses pemesanan lapangan olahraga seperti futsal atau basket. Sistem ini dibangun menggunakan framework Vue 3 dan menggunakan json-server sebagai backend palsu (mock API).

## Deskripsi Proyek

Aplikasi booking lapangan memiliki dua jenis pengguna, yaitu **user biasa** dan **admin**. User bisa melihat daftar lapangan dan melakukan booking, sedangkan admin bisa mengelola data lapangan dan melihat seluruh jadwal booking.

## Fitur Utama

### Untuk User:
- Login
- Melihat daftar lapangan
- Booking lapangan
- Melihat, mengedit, dan menghapus jadwal booking sendiri
- Logout

### Untuk Admin:
- Login
- Melihat semua booking
- Menambah, mengedit, dan menghapus data lapangan
- Melihat status lapangan (tersedia / terpakai)
- Logout

## Navigasi Halaman

| Halaman             | Akses        | Path                 |
|---------------------|--------------|----------------------|
| Dashboard           | Semua        | /dashboard         |
| Daftar Lapangan     | Semua        | /lapangan          |
| Jadwal Booking      | Semua        | /jadwal            |
| Form Booking        | User         | /booking/:id       |
| Manajemen Lapangan  | Admin        | /admin/lapangan    |
| Manajemen Jadwal    | Admin        | /admin/jadwal      |
| Login               | Semua        | /login             |

## API Endpoint (json-server)

### Lapangan
- GET /lapangan → Ambil semua data lapangan
- POST /lapangan → Tambah data lapangan baru
- PUT /lapangan/:id → Edit lapangan
- DELETE /lapangan/:id → Hapus lapangan

### Booking
- GET /booking → Ambil semua data booking
- POST /booking → Tambah booking baru
- PUT /booking/:id → Edit booking
- DELETE /booking/:id → Hapus booking

## Akun Contoh

| Role  | Username | Password |
|-------|----------|----------|
| Admin | admin    | admin    |
| User  | user     | user     |

## Cara Menjalankan

1. Clone repo ini:
   `ash
   git clone https://github.com/username/booking-lapangan.git
   cd booking-lapangan

