// ============================================================================
// TEKS HUKUM & HAK CIPTA - KOSTAPP INDONESIA
// Berdasarkan Undang-Undang Republik Indonesia
// ============================================================================

export const COPYRIGHT_YEAR = 2026;
export const COMPANY_NAME = "KostApp Indonesia";
export const COMPANY_SHORT = "KostApp";

// ============================================================================
// REFERENSI UNDANG-UNDANG
// ============================================================================

export const LEGAL_REFERENCES = {
  hakCipta: {
    name: "Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta",
    shortName: "UU No. 28/2014",
    lnri: "Lembaran Negara Republik Indonesia Tahun 2014 Nomor 266",
    articles: {
      pasal9: "Pasal 9 ayat (3): Setiap Orang yang tanpa izin Pencipta atau Pemegang Hak Cipta dilarang melakukan Penggandaan dan/atau Penggunaan Secara Komersial Ciptaan.",
      pasal113_3: "Pasal 113 ayat (3): Setiap Orang yang dengan tanpa hak dan/atau tanpa izin Pencipta atau pemegang Hak Cipta melakukan pelanggaran hak ekonomi Pencipta untuk Penggandaan dan/atau Penggunaan Secara Komersial dipidana dengan pidana penjara paling lama 4 (empat) tahun dan/atau pidana denda paling banyak Rp1.000.000.000,00 (satu miliar rupiah).",
      pasal113_4: "Pasal 113 ayat (4): Setiap Orang yang memenuhi unsur sebagaimana dimaksud pada ayat (3) yang dilakukan dalam bentuk pembajakan, dipidana dengan pidana penjara paling lama 10 (sepuluh) tahun dan/atau pidana denda paling banyak Rp4.000.000.000,00 (empat miliar rupiah)."
    }
  },
  ite: {
    name: "Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik",
    amendment: "sebagaimana telah diubah dengan Undang-Undang Nomor 19 Tahun 2016",
    shortName: "UU ITE",
    description: "Mengatur tentang keabsahan dokumen elektronik dan transaksi elektronik"
  },
  ppPste: {
    name: "Peraturan Pemerintah Nomor 71 Tahun 2019",
    about: "tentang Penyelenggaraan Sistem dan Transaksi Elektronik",
    shortName: "PP PSTE",
    description: "Mengatur tata kelola sistem elektronik dan transaksi elektronik"
  },
  pdp: {
    name: "Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi",
    shortName: "UU PDP",
    description: "Mengatur hak subjek data pribadi dan kewajiban pengendali data"
  },
  perlindunganKonsumen: {
    name: "Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen",
    shortName: "UU PK",
    description: "Mengatur hak-hak konsumen dan kewajiban pelaku usaha"
  },
  perbankan: {
    name: "Peraturan Bank Indonesia tentang Standar Nasional Quick Response Code (QRIS)",
    description: "Mengatur standar pembayaran menggunakan QR Code di Indonesia"
  }
};

// ============================================================================
// TEKS LEGAL LENGKAP
// ============================================================================

export const LEGAL_TEXTS = {
  copyright: {
    title: "Hak Cipta",
    shortText: `© ${COPYRIGHT_YEAR} ${COMPANY_SHORT}. Hak cipta dilindungi Undang-Undang.`,
    fullText: `
════════════════════════════════════════════════════════════════════════════════
                           PEMBERITAHUAN HAK CIPTA
                        OFFICIAL COPYRIGHT NOTICE
════════════════════════════════════════════════════════════════════════════════

© ${COPYRIGHT_YEAR} ${COMPANY_NAME}
NPWP: 01.234.567.8-901.000
NIB: 1234567890123

────────────────────────────────────────────────────────────────────────────────
                              CAKUPAN PERLINDUNGAN
────────────────────────────────────────────────────────────────────────────────

Seluruh konten dalam platform KostApp, termasuk namun tidak terbatas pada:

  1. KODE SUMBER (Source Code)
     - Frontend application code
     - Backend services code
     - Database schemas and structures
     - API implementations
     - Algorithms and business logic

  2. DESAIN DAN VISUAL
     - User Interface (UI) Design
     - User Experience (UX) Design
     - Logo dan identitas visual
     - Ikon dan ilustrasi custom
     - Color schemes dan typography

  3. KONTEN TEKSTUAL
     - Copywriting dan microcopy
     - Dokumentasi teknis
     - Panduan pengguna
     - Syarat dan ketentuan
     - Kebijakan privasi

  4. PROPERTI INTELEKTUAL LAINNYA
     - Nama merek "KostApp"
     - Tagline dan slogan
     - Domain kostapp.id
     - Metodologi bisnis

────────────────────────────────────────────────────────────────────────────────
                              DASAR HUKUM
────────────────────────────────────────────────────────────────────────────────

Dilindungi berdasarkan:

${LEGAL_REFERENCES.hakCipta.name}
${LEGAL_REFERENCES.hakCipta.lnri}

KETENTUAN PIDANA:

${LEGAL_REFERENCES.hakCipta.articles.pasal9}

${LEGAL_REFERENCES.hakCipta.articles.pasal113_3}

${LEGAL_REFERENCES.hakCipta.articles.pasal113_4}

────────────────────────────────────────────────────────────────────────────────
                              LARANGAN
────────────────────────────────────────────────────────────────────────────────

DILARANG KERAS tanpa izin tertulis dari ${COMPANY_NAME}:

  ✗ Menyalin, menggandakan, atau mereproduksi konten
  ✗ Memodifikasi atau membuat karya turunan
  ✗ Mendistribusikan atau menyebarluaskan
  ✗ Menggunakan untuk kepentingan komersial
  ✗ Melakukan reverse engineering
  ✗ Menghapus atau mengubah atribusi hak cipta
  ✗ Mengklaim sebagai karya sendiri

────────────────────────────────────────────────────────────────────────────────
                              SANKSI HUKUM
────────────────────────────────────────────────────────────────────────────────

Pelanggaran terhadap hak cipta ini dapat dikenakan:

  ⚠ PIDANA PENJARA: Maksimal 10 (sepuluh) tahun
  ⚠ DENDA: Maksimal Rp4.000.000.000,00 (empat miliar rupiah)
  ⚠ GANTI RUGI: Sesuai dengan kerugian yang diderita

────────────────────────────────────────────────────────────────────────────────
                              IZIN PENGGUNAAN
────────────────────────────────────────────────────────────────────────────────

Untuk permintaan izin penggunaan, lisensi, atau kerjasama:

  Email  : legal@kostapp.id
  Telepon: 0858-2000-1352
  Alamat : Jl. Ahmad Yani No. 88, Pontianak 78121, Kalimantan Barat

════════════════════════════════════════════════════════════════════════════════
                    ${COMPANY_NAME}
                    Pontianak, Kalimantan Barat, Indonesia
════════════════════════════════════════════════════════════════════════════════
    `.trim()
  },

  termsOfService: {
    title: "Syarat dan Ketentuan Layanan",
    lastUpdated: "1 Januari 2026",
    content: `
════════════════════════════════════════════════════════════════════════════════
                      SYARAT DAN KETENTUAN LAYANAN
                           TERMS OF SERVICE
                    Platform KostApp - ${COMPANY_NAME}
════════════════════════════════════════════════════════════════════════════════

Berlaku efektif: 1 Januari 2026

────────────────────────────────────────────────────────────────────────────────
                              PASAL 1 – DEFINISI
────────────────────────────────────────────────────────────────────────────────

1.1. "Platform" mengacu pada aplikasi web KostApp beserta seluruh fitur dan 
     layanan yang disediakan oleh ${COMPANY_NAME}.

1.2. "Pengguna" adalah setiap individu yang mengakses dan/atau menggunakan 
     Platform, baik terdaftar maupun tidak terdaftar.

1.3. "Penyewa" adalah Pengguna yang melakukan pemesanan (booking) hunian 
     melalui Platform.

1.4. "Pemilik Kost" adalah pihak yang mendaftarkan dan menawarkan properti 
     hunian melalui Platform.

1.5. "Transaksi" adalah setiap aktivitas pemesanan dan pembayaran yang 
     dilakukan melalui Platform.

1.6. "E-Contract" adalah perjanjian sewa menyewa elektronik yang dibuat 
     melalui Platform.

────────────────────────────────────────────────────────────────────────────────
                         PASAL 2 – KETENTUAN UMUM
────────────────────────────────────────────────────────────────────────────────

2.1. Dengan menggunakan Platform ini, Pengguna menyatakan telah membaca, 
     memahami, dan menyetujui untuk terikat dengan seluruh syarat dan 
     ketentuan yang berlaku.

2.2. ${COMPANY_NAME} berhak mengubah syarat dan ketentuan ini sewaktu-waktu 
     dengan pemberitahuan melalui Platform. Perubahan berlaku efektif sejak 
     dipublikasikan.

2.3. Pengguna wajib berusia minimal 17 (tujuh belas) tahun atau telah 
     memiliki Kartu Tanda Penduduk (KTP) yang sah.

2.4. Platform ini tunduk pada hukum Republik Indonesia.

────────────────────────────────────────────────────────────────────────────────
                          PASAL 3 – AKUN PENGGUNA
────────────────────────────────────────────────────────────────────────────────

3.1. Pengguna bertanggung jawab penuh atas keamanan dan kerahasiaan akun, 
     termasuk username dan password.

3.2. Setiap aktivitas yang dilakukan melalui akun Pengguna dianggap sebagai 
     tindakan yang sah dari Pengguna tersebut.

3.3. Pengguna dilarang:
     a) Membuat akun dengan identitas palsu atau menyesatkan
     b) Menggunakan akun orang lain tanpa izin
     c) Menjual, memindahkan, atau menyewakan akun kepada pihak lain
     d) Menggunakan Platform untuk tujuan ilegal

3.4. Platform berhak menonaktifkan atau menghapus akun yang melanggar 
     ketentuan ini.

────────────────────────────────────────────────────────────────────────────────
                     PASAL 4 – OPSI PEMBAYARAN
────────────────────────────────────────────────────────────────────────────────

4.1. Platform menyediakan tiga (3) opsi pembayaran:

     OPSI A - BAYAR PENUH (Full Payment)
     • Pembayaran 100% di muka
     • Melalui scan QR (QRIS)
     • Transaksi selesai setelah pembayaran berhasil
     • Struk elektronik diterbitkan otomatis

     OPSI B - BAYAR DP (Down Payment)
     • Pembayaran DP minimal 30% dari total
     • Sisa pembayaran sesuai jadwal cicilan
     • Maksimal 3 (tiga) kali angsuran
     • Denda keterlambatan 2% per minggu

     OPSI C - BAYAR DI TEMPAT (Cash on Location)
     • Pembayaran deposit booking Rp100.000
     • Pembayaran penuh saat check-in
     • Kode verifikasi dikirim via SMS/WhatsApp
     • Deposit hangus jika tidak hadir tanpa konfirmasi

4.2. Setiap transaksi dicatat secara elektronik dan memiliki kekuatan hukum 
     yang sama dengan dokumen tertulis sesuai dengan ${LEGAL_REFERENCES.ite.shortName}.

4.3. Struk pembayaran yang dihasilkan Platform merupakan bukti transaksi 
     yang sah dan dapat digunakan sebagai alat bukti di pengadilan.

────────────────────────────────────────────────────────────────────────────────
                    PASAL 5 – E-CONTRACT (PERJANJIAN ELEKTRONIK)
────────────────────────────────────────────────────────────────────────────────

5.1. Setiap booking yang berhasil akan menghasilkan E-Contract yang mengikat 
     secara hukum antara Penyewa dan Pemilik Kost.

5.2. E-Contract memuat:
     a) Identitas para pihak
     b) Detail properti yang disewa
     c) Periode sewa dan harga
     d) Hak dan kewajiban masing-masing pihak
     e) Ketentuan pembatalan
     f) Penyelesaian sengketa

5.3. E-Contract sah dan mengikat setelah Penyewa menyetujui (accept) 
     melalui Platform.

5.4. E-Contract dilindungi oleh:
     • ${LEGAL_REFERENCES.ite.name}
     • ${LEGAL_REFERENCES.ppPste.name}

────────────────────────────────────────────────────────────────────────────────
                  PASAL 6 – PEMBATALAN DAN PENGEMBALIAN DANA
────────────────────────────────────────────────────────────────────────────────

6.1. Ketentuan Pembatalan:
     a) > 7 hari sebelum check-in: Refund 100%
     b) 3-7 hari sebelum check-in: Refund 50%
     c) < 3 hari sebelum check-in: Tidak ada refund

6.2. Pengecualian refund penuh diberikan dalam kondisi:
     a) Kesalahan sistem yang diakui oleh Platform
     b) Kost tidak tersedia sesuai informasi yang ditampilkan
     c) Kondisi force majeure yang diakui oleh Platform

6.3. Proses pengembalian dana memerlukan waktu 7-14 hari kerja.

────────────────────────────────────────────────────────────────────────────────
                     PASAL 7 – BATASAN TANGGUNG JAWAB
────────────────────────────────────────────────────────────────────────────────

7.1. Platform bertindak sebagai perantara antara Penyewa dan Pemilik Kost.

7.2. Platform tidak bertanggung jawab atas:
     a) Kondisi aktual properti yang berbeda dari deskripsi pemilik
     b) Perselisihan antara Penyewa dan Pemilik Kost
     c) Kerugian yang timbul akibat kelalaian Pengguna
     d) Kerugian akibat force majeure

7.3. Total tanggung jawab Platform tidak akan melebihi nilai transaksi 
     yang telah dibayarkan oleh Pengguna.

────────────────────────────────────────────────────────────────────────────────
                PASAL 8 – HUKUM DAN PENYELESAIAN SENGKETA
────────────────────────────────────────────────────────────────────────────────

8.1. Syarat dan Ketentuan ini tunduk pada hukum Republik Indonesia.

8.2. Setiap sengketa akan diselesaikan secara musyawarah untuk mufakat.

8.3. Apabila musyawarah tidak mencapai kesepakatan dalam waktu 30 hari, 
     sengketa akan diselesaikan melalui:
     a) Mediasi melalui Badan Penyelesaian Sengketa Konsumen (BPSK), atau
     b) Badan Arbitrase Nasional Indonesia (BANI), atau
     c) Pengadilan Negeri yang berwenang di wilayah hukum Pontianak, 
        Kalimantan Barat

────────────────────────────────────────────────────────────────────────────────
                         PASAL 9 – KETENTUAN PENUTUP
────────────────────────────────────────────────────────────────────────────────

9.1. Jika ada ketentuan dalam Syarat dan Ketentuan ini yang dinyatakan 
     tidak sah atau tidak dapat dilaksanakan, ketentuan lainnya tetap 
     berlaku sepenuhnya.

9.2. Kegagalan Platform untuk menerapkan hak atau ketentuan dalam Syarat 
     dan Ketentuan ini tidak dianggap sebagai pengabaian hak tersebut.

9.3. Syarat dan Ketentuan ini merupakan keseluruhan perjanjian antara 
     Pengguna dan Platform mengenai penggunaan layanan.

════════════════════════════════════════════════════════════════════════════════

${COMPANY_NAME}
Jl. Ahmad Yani No. 88, Ketapang 78121
Kalimantan Barat, Indonesia

Email: legal@kostapp.id
Telepon: 0858-2000-1352

════════════════════════════════════════════════════════════════════════════════
    `.trim()
  },

  privacyPolicy: {
    title: "Kebijakan Privasi",
    lastUpdated: "1 Januari 2026",
    content: `
════════════════════════════════════════════════════════════════════════════════
                           KEBIJAKAN PRIVASI
                          PRIVACY POLICY
                    Platform KostApp - ${COMPANY_NAME}
════════════════════════════════════════════════════════════════════════════════

Berlaku efektif: 1 Januari 2026

────────────────────────────────────────────────────────────────────────────────
                              PENDAHULUAN
────────────────────────────────────────────────────────────────────────────────

${COMPANY_NAME} ("Kami") berkomitmen untuk melindungi privasi dan data 
pribadi Anda sesuai dengan:

• ${LEGAL_REFERENCES.pdp.name}
• ${LEGAL_REFERENCES.ite.name}
• ${LEGAL_REFERENCES.ppPste.name}

Kebijakan Privasi ini menjelaskan bagaimana Kami mengumpulkan, menggunakan, 
menyimpan, dan melindungi data pribadi Anda.

────────────────────────────────────────────────────────────────────────────────
                      1. DATA YANG KAMI KUMPULKAN
────────────────────────────────────────────────────────────────────────────────

1.1. Data Pribadi yang Anda Berikan:
     • Nama lengkap
     • Nomor Induk Kependudukan (NIK) - opsional
     • Alamat email
     • Nomor telepon
     • Alamat domisili
     • Username dan password (terenkripsi)
     • Foto profil (opsional)

1.2. Data Transaksi:
     • Riwayat pemesanan dan pembayaran
     • Detail kontrak sewa
     • Preferensi hunian
     • Komunikasi dengan pemilik kost

1.3. Data Teknis:
     • Alamat IP
     • Jenis perangkat dan browser
     • Sistem operasi
     • Data lokasi (dengan izin eksplisit)
     • Cookie dan data analitik

────────────────────────────────────────────────────────────────────────────────
                      2. TUJUAN PENGGUNAAN DATA
────────────────────────────────────────────────────────────────────────────────

Kami menggunakan data pribadi Anda untuk:

a) Menyediakan dan mengelola layanan Platform
b) Memproses transaksi dan pembayaran
c) Membuat dan mengelola E-Contract
d) Memverifikasi identitas pengguna
e) Mengirimkan notifikasi terkait layanan
f) Mengirimkan informasi promo (dengan persetujuan)
g) Meningkatkan kualitas layanan
h) Mencegah penipuan dan aktivitas ilegal
i) Mematuhi kewajiban hukum

────────────────────────────────────────────────────────────────────────────────
                    3. PENYIMPANAN DAN KEAMANAN DATA
────────────────────────────────────────────────────────────────────────────────

3.1. Data pribadi Anda disimpan dengan:
     • Enkripsi AES-256 untuk data sensitif
     • SSL/TLS untuk transmisi data
     • Firewall dan sistem deteksi intrusi
     • Audit log untuk akses data

3.2. Lokasi Penyimpanan:
     • Server berlokasi di Indonesia
     • Sesuai dengan regulasi data residency

3.3. Retensi Data:
     • Data aktif: Selama akun aktif
     • Data transaksi: 5 tahun sesuai kewajiban hukum
     • Log sistem: 1 tahun

────────────────────────────────────────────────────────────────────────────────
                     4. HAK SUBJEK DATA PRIBADI
────────────────────────────────────────────────────────────────────────────────

Sesuai ${LEGAL_REFERENCES.pdp.shortName}, Anda berhak untuk:

a) AKSES - Memperoleh informasi tentang pemrosesan data Anda
b) PERBAIKAN - Memperbarui dan/atau memperbaiki data Anda
c) PENGHAPUSAN - Meminta penghapusan data Anda
d) PENARIKAN - Menarik kembali persetujuan pemrosesan data
e) KEBERATAN - Mengajukan keberatan atas pengambilan keputusan otomatis
f) PORTABILITAS - Memperoleh salinan data dalam format yang dapat dibaca
g) GUGATAN - Mengajukan gugatan atas pelanggaran data pribadi

────────────────────────────────────────────────────────────────────────────────
                    5. PEMBAGIAN DATA KEPADA PIHAK KETIGA
────────────────────────────────────────────────────────────────────────────────

5.1. Kami TIDAK menjual data pribadi Anda kepada pihak ketiga.

5.2. Data dapat dibagikan kepada:
     • Penyedia layanan pembayaran (untuk memproses transaksi)
     • Pemilik kost (informasi yang diperlukan untuk pemesanan)
     • Penyedia layanan cloud (untuk penyimpanan data)
     • Pihak berwenang (jika diwajibkan oleh hukum)

5.3. Semua pihak ketiga terikat perjanjian kerahasiaan.

────────────────────────────────────────────────────────────────────────────────
                           6. DATA PROTECTION OFFICER
────────────────────────────────────────────────────────────────────────────────

Untuk pertanyaan atau permintaan terkait data pribadi, hubungi:

Data Protection Officer (DPO)
${COMPANY_NAME}

Email: dpo@kostapp.id
Telepon: 0858-2000-1352
Alamat: Jl. Ahmad Yani No. 88, Ketapang 78121

Waktu Respons: Maksimal 3x24 jam

════════════════════════════════════════════════════════════════════════════════

${COMPANY_NAME}
Jl. Ahmad Yani No. 88, Ketapang 78121
Kalimantan Barat, Indonesia

════════════════════════════════════════════════════════════════════════════════
    `.trim()
  },

  // Teks disclaimer untuk struk - versi sederhana
  receiptDisclaimer: `Struk ini adalah bukti pembayaran yang sah.`.trim(),

  receiptFooter: `Simpan struk ini sebagai bukti transaksi Anda. Hubungi support@kostapp.id atau 0858-2000-1352 jika ada pertanyaan.`.trim(),

  contractPreamble: `
PERJANJIAN SEWA MENYEWA ELEKTRONIK (E-CONTRACT)
Nomor: [CONTRACT_NUMBER]

Pada hari ini, [DATE], telah dibuat Perjanjian Sewa Menyewa antara:

1. PIHAK PERTAMA (Pemilik Kost)
2. PIHAK KEDUA (Penyewa)

Selanjutnya disebut "Para Pihak", yang sepakat untuk mengikatkan diri 
dalam Perjanjian Sewa Menyewa dengan ketentuan sebagai berikut:
  `.trim(),

  contractTerms: [
    "Pihak Pertama dengan ini menyewakan kepada Pihak Kedua, dan Pihak Kedua dengan ini menyewa dari Pihak Pertama, kamar kost sebagaimana tercantum dalam dokumen ini.",
    "Pihak Kedua wajib membayar uang sewa sesuai dengan opsi pembayaran yang dipilih dan jadwal yang telah disepakati.",
    "Pihak Kedua wajib menjaga kebersihan dan ketertiban selama masa sewa.",
    "Pihak Kedua dilarang mengalihkan hak sewa kepada pihak lain tanpa persetujuan tertulis dari Pihak Pertama.",
    "Pihak Kedua wajib mematuhi peraturan kost yang ditetapkan oleh Pihak Pertama.",
    "Kerusakan yang disebabkan oleh kelalaian Pihak Kedua menjadi tanggung jawab Pihak Kedua.",
    "Pihak Pertama berhak mengakhiri perjanjian ini jika Pihak Kedua melanggar ketentuan yang telah disepakati.",
    "Segala perselisihan yang timbul akan diselesaikan secara musyawarah, dan jika tidak tercapai kesepakatan, akan diselesaikan sesuai dengan ketentuan hukum yang berlaku di Indonesia."
  ],

  transactionLegalNote: `
Transaksi ini dilindungi oleh UU ITE dan PP PSTE. Diproses sesuai 
standar keamanan pembayaran digital Bank Indonesia.
  `.trim()
};

// ============================================================================
// INFORMASI PERUSAHAAN
// ============================================================================

export const COMPANY_INFO = {
  name: COMPANY_NAME,
  shortName: COMPANY_SHORT,
  legalEntity: "Perseroan Terbatas",
  registrationNumber: "AHU-0012345.AH.01.01.TAHUN2024",
  npwp: "01.234.567.8-901.000",
  nib: "1234567890123",
  address: {
    street: "Jl. Gajahmada No. 88",
    city: "Ketapang",
    province: "Kalimantan Barat",
    postalCode: "78121",
    country: "Indonesia"
  },
  contact: {
    email: "support@kostapp.id",
    phone: "0858-2000-1352",
    whatsapp: "6285820001352",
    legalEmail: "legal@kostapp.id",
    dpoEmail: "dpo@kostapp.id",
    partnerEmail: "partner@kostapp.id",
    careerEmail: "career@kostapp.id"
  },
  socialMedia: {
    instagram: "https://www.instagram.com/kostapp2026?igsh=MWFpaTRvOHRzMnY3ZQ==",
    twitter: "https://twitter.com/kostapp_id",
    linkedin: "https://linkedin.com/company/kostapp",
    youtube: "https://youtu.be/Iqr3XIhSnUQ?si=ULyhugTWAVsWeKAK"
  },
  operatingHours: "Senin - Minggu, 08.00 - 22.00 WIB"
};

// ============================================================================
// OPSI PEMBAYARAN
// ============================================================================

export const PAYMENT_OPTIONS = {
  OPTION_A: {
    id: 'OPTION_A' as const,
    name: 'Bayar Penuh',
    subtitle: 'Full Payment',
    description: 'Bayar 100% sekarang via QRIS',
    icon: 'credit-card',
    color: 'emerald',
    available: true,
    terms: [
      'Pembayaran 100% di muka',
      'Proses instan via scan QR (QRIS)',
      'Struk elektronik langsung diterbitkan',
      'E-Contract aktif segera setelah pembayaran',
      'Mendapat prioritas konfirmasi dari pemilik kost'
    ],
    benefits: [
      'Tidak ada biaya tambahan',
      'Proses tercepat',
      'Jaminan kamar langsung terkonfirmasi'
    ]
  },
  OPTION_B: {
    id: 'OPTION_B' as const,
    name: 'Bayar DP',
    subtitle: 'Down Payment + Cicilan',
    description: 'Bayar DP 30%, sisa dicicil',
    icon: 'calendar',
    color: 'blue',
    available: true,
    dpPercentage: 30,
    maxInstallments: 3,
    lateFeePercentage: 2,
    terms: [
      'DP minimal 30% dari total pembayaran',
      'Sisa pembayaran dicicil maksimal 3x',
      'Cicilan pertama maksimal 30 hari setelah DP',
      'Denda keterlambatan 2% per minggu',
      'E-Contract aktif setelah DP terbayar'
    ],
    benefits: [
      'Lebih ringan di awal',
      'Jadwal cicilan fleksibel',
      'Tetap mendapat jaminan kamar'
    ]
  },
  OPTION_C: {
    id: 'OPTION_C' as const,
    name: 'Bayar di Tempat',
    subtitle: 'Cash on Location',
    description: 'Bayar saat check-in langsung',
    icon: 'map-pin',
    color: 'amber',
    available: true,
    depositAmount: 100000,
    terms: [
      'Deposit booking Rp100.000 (non-refundable)',
      'Pembayaran penuh saat check-in',
      'Kode verifikasi dikirim via WhatsApp',
      'Wajib hadir sesuai jadwal check-in',
      'Deposit hangus jika tidak hadir tanpa konfirmasi 24 jam sebelumnya'
    ],
    benefits: [
      'Bisa survey lokasi dulu',
      'Bayar cash langsung ke pemilik',
      'Cocok untuk yang tidak punya rekening'
    ]
  }
};

// ============================================================================
// TEMPLATE NOMOR DOKUMEN
// ============================================================================

export const generateTransactionId = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TXN${year}${month}${random}`;
};

export const generateReferenceNumber = (): string => {
  const random = Math.random().toString(36).slice(2, 12).toUpperCase();
  return `REF${random}`;
};

export const generateInvoiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INV/${year}/${month}/${random}`;
};

export const generateContractNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KA-CONTRACT/${year}/${month}/${random}`;
};

export const generateVerificationCode = (): string => {
  return Math.random().toString().slice(2, 8);
};
