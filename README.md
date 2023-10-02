# Aplikasi Perpustakaan

Aplikasi Perpustakaan adalah aplikasi berbasis web yang memungkinkan pengguna untuk melihat, meminjam, dan mengelola informasi buku dalam perpustakaan. Aplikasi ini juga memiliki fitur untuk mengedit dan menghapus buku, serta mengembalikan buku yang telah dipinjam.

## Fitur

- Melihat detail buku, termasuk judul, tahun terbit, pengarang, penerbit, dan deskripsi.
- Meminjam buku.
- Mengedit buku (hanya untuk pengguna admin).
- Menghapus buku (hanya untuk pengguna admin).
- Mengembalikan buku yang telah dipinjam (hanya jika Anda adalah peminjam).

## Cara Menggunakan Aplikasi

1. **Registrasi atau Masuk**

   - Sebelum menggunakan aplikasi, pengguna perlu melakukan registrasi atau masuk dengan akun yang sudah ada.

2. **Halaman Utama**

   - Setelah masuk, pengguna akan melihat daftar buku yang tersedia dalam perpustakaan.

3. **Melihat Detail Buku**

   - Klik pada judul buku untuk melihat detail buku, termasuk deskripsi dan status ketersediaan.

4. **Meminjam Buku**

   - Jika buku tersedia, pengguna dapat mengklik tombol "Borrow" untuk meminjam buku tersebut.

5. **Mengembalikan Buku**

   - Jika Anda adalah peminjam buku tersebut, tombol "Return Book" akan muncul saat Anda melihat detail buku. Klik tombol ini untuk mengembalikan buku yang telah dipinjam.

6. **Mengedit atau Menghapus Buku (Admin)**

   - Jika Anda adalah pengguna dengan peran admin, Anda dapat mengedit atau menghapus buku dengan mengklik tombol "Edit" atau "Delete" saat melihat detail buku.

## Setup Proyek

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1. Clone repositori ini ke komputer Anda:

   ```bash
   git clone https://github.com/esamjr/reactjs-library-fazztrack.git
   ```

2. Instal dependensi:

   ```bash
   cd reactjs-library-fazztrack
   npm install
   ```

3. Jalankan proyek:

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173`.