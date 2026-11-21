# 👑 Website Pribadi apiiem: Pink Princess

Website pribadi satu halaman bertema **pink princess** dengan warna **pink dan cream**. Dibuat hanya dengan **HTML, CSS, dan JavaScript Vanilla**, tanpa framework dan tanpa proses build.

## Isi Folder

```
pink-princess-website/
├── index.html    → struktur dan isi halaman
├── style.css     → tampilan, warna, dan tata letak
├── script.js     → interaksi (menu, mode malam, kilau, hitung mundur, formulir)
├── README.md     → panduan ini
└── assets/       → (buat sendiri) taruh foto profil di sini
```

## Cara Membuka

1. Unduh dan ekstrak semua file ke satu folder.
2. Klik dua kali `index.html`. Website langsung terbuka di browser.

> Font (Cormorant Garamond dan Quicksand) dimuat dari Google Fonts, jadi butuh koneksi internet. Tanpa internet, website tetap tampil dengan font cadangan.

## Fitur

- Mahkota interaktif di halaman utama: ketuk untuk menebar kilau dan memunculkan pesan kecil
- Jejak kilau mengikuti kursor (hanya di perangkat dengan mouse)
- **Hitung mundur ulang tahun** otomatis (31 Januari)
- **Mode malam** yang tersimpan di browser
- Bar "seberapa aku suka" yang terisi saat di-scroll
- Palet warna favorit: pink dan cream
- Formulir kontak yang membuka aplikasi email
- Responsif untuk HP, tablet, dan desktop
- Mendukung navigasi keyboard dan menghormati pengaturan "kurangi gerakan"

## Cara Mengganti Isi

| Yang diganti | Lokasi |
| --- | --- |
| Nama, kota, hobi, warna favorit | bagian `id="tentang"` di `index.html` (daftar `class="facts"`) |
| Cerita singkat tentang diri | paragraf pertama di bagian `id="tentang"` |
| Hobi tambahan | daftar `class="chips"` di bagian `id="favorit"` |
| Link sosial media | daftar `class="links"`. Ganti `usernamekamu` dengan username aslimu |
| Email tujuan formulir | `CONFIG.email` di bagian paling atas `script.js` |
| Tanggal ulang tahun (untuk hitung mundur) | `CONFIG.ulangTahun` di `script.js` |

## Cara Menambahkan Foto

1. Buat folder bernama `assets` di samping `index.html`.
2. Simpan fotomu sebagai `foto.jpg` di dalamnya (lebih bagus jika berbentuk persegi).
3. Muat ulang halaman. Selama foto belum ada, yang tampil adalah siluet bawaan.

## Cara Mengganti Warna

Buka `style.css` dan ubah variabel di bagian `:root`:

```css
:root {
  --blush: #fff4e6;     /* cream, latar halaman */
  --petal: #ffd9e8;     /* pink lembut untuk hover */
  --rose: #e85d9f;      /* pink utama */
  --raspberry: #b82a73; /* pink tua untuk tombol dan aksen */
  --gold: #c98f3c;      /* emas untuk mahkota dan garis */
  --lilac: #fde3d0;     /* cream hangat untuk bar dan chip */
}
```

Warna mode malam ada di blok `[data-theme="dark"]` tepat di bawahnya.

## Tips Keamanan Saat Website Dipublikasikan

- Jangan menaruh alamat rumah, nomor HP, atau nama sekolah di website yang bisa dilihat siapa saja.
- Tanggal lahir lengkap dengan tahun sengaja tidak ditampilkan. Hitung mundur hanya memakai tanggal dan bulan.
- Minta izin orang tua atau wali sebelum mengunggah website ke internet.
- Pakai email khusus untuk formulir kontak, bukan email utama.

## Cara Mengunggah ke Internet (Gratis)

- **GitHub Pages**: unggah folder ke repository, lalu aktifkan *Settings → Pages*.
- **Netlify**: buka [app.netlify.com/drop](https://app.netlify.com/drop), lalu seret folder website ke halaman tersebut.
- **Vercel / Cloudflare Pages**: hubungkan repository, tanpa pengaturan build.

## Catatan

- Formulir kontak memakai `mailto:`, jadi pesan dikirim lewat aplikasi email pengunjung dan tidak lewat server.
- Semua kode diberi komentar agar mudah dipelajari dan diubah.

Selamat berkreasi! 💖
