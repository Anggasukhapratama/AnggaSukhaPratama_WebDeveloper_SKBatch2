# Sekolah Karir — Recruitment Landing Page Section
**Mini Assignment: Web Developer (Batch 2)**

- **Nama Kandidat:** `[Isi Nama Lengkap Sesuai Email Undangan]`
- **Applicant ID:** `[Isi Applicant ID Sesuai Email Undangan]`
- **Live Demo (Opsional):** `[Isi Link Vercel Jika Di-deploy]`

Sebuah implementasi *responsive recruitment landing page section* untuk **Sekolah Karir** yang menampilkan *headline*, *filterable role cards*, *keyword search*, serta *interactive Call-to-Action (CTA)* baik untuk posisi spesifik maupun *open talent pool*.

---

## 1. Cara Menjalankan Project (How to Run Locally)

### Prasyarat
- **Node.js** versi `18.18+` atau `20+`
- Package manager: `npm` (atau `pnpm` / `yarn` / `bun`)

### Langkah Menjalankan
1. Clone repository dan masuk ke direktori project:
   ```bash
   git clone https://github.com/<username>/<NamaLengkap>_WebDeveloper_SKBatch2.git
   cd <NamaLengkap>_WebDeveloper_SKBatch2
   ```
2. Install seluruh dependencies:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```
4. Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### Build untuk Production (Opsional)
Untuk memastikan tidak ada error kompilasi maupun *linting*:
```bash
npm run lint
npm run build
npm run start
```

---

## 2. Keputusan Utama (Key Product & Technical Decisions)

Sesuai dengan konteks brief bahwa penilaian dititikberatkan pada **kualitas *reasoning*** dan **eksekusi brief secara praktis**, berikut adalah keputusan produk dan teknis yang diambil:

### A. Pemilihan Tech Stack: Next.js (App Router) + TypeScript + Tailwind CSS
- **Kecepatan & Maintainability**: Next.js dengan Tailwind CSS memungkinkan pembuatan komponen UI yang konsisten, *modular*, dan mudah di-*deploy* (misalnya ke Vercel) tanpa konfigurasi berlebih.
- **Type Safety**: Struktur data lowongan kerja (`JobRole`) didefinisikan secara eksplisit menggunakan TypeScript `interface` agar setiap atribut (*department*, *workMode*, *experience*, *highlights*, *tags*) tervalidasi dan mudah diintegrasikan ke API di masa depan.
- **Zero Paid/External UI Dependencies**: Seluruh komponen, ikon SVG, dan state modal dibangun secara *native* menggunakan React + Tailwind CSS sesuai aturan brief (*tidak menggunakan tool/API berbayar*).

### B. Keputusan Produk & UX (Product Reasoning)
1. **Visual Hierarchy yang Jelas (Scannability)**
   - **Header & Headline**: Langsung menyampaikan *value proposition* Sekolah Karir beserta *trust badges* singkat (*Remote-friendly WIB*, *Practical Culture*, *High-Impact EdTech*) agar kandidat langsung memahami konteks budaya kerja.
   - **Struktur Role Card**: Setiap kartu menampilkan informasi paling krusial yang dicari kandidat sebelum melamar: *Department*, *Lokasi/Zona Waktu*, *Judul Posisi*, *Tipe Kerja & Ekspektasi Pengalaman*, deskripsi singkat, serta *Skill Tags*.
2. **Kemudahan Eksplorasi (Department Filter + Keyword Search)**
   - Kandidat dapat memfilter posisi berdasarkan departemen (`All`, `Engineering`, `Design`, `Product & Curriculum`) lengkap dengan indikator jumlah posisi, atau mencari langsung berdasarkan *skill* (misal: `Next.js`, `Figma`, `QA`).
   - Disediakan *empty state* dengan tombol *Reset Filters* jika kata kunci pencarian tidak ditemukan.
3. **Dual Call-to-Action (Primary & Fallback CTA)**
   - **Primary CTA pada Setiap Role Card (`View & Apply`)**: Membuka modal detail singkat (*What You Will Do*) sekaligus form lamaran cepat (*mock state*) sehingga pengguna merasakan alur *end-to-end* yang fungsional, bukan sekadar tombol mati (`href="#"`).
   - **Secondary/Fallback CTA (`Submit Open Application`)**: Ditempatkan di bagian bawah halaman (*Open Talent Pool banner*) untuk menangkap talenta potensial yang belum menemukan posisi yang cocok di daftar saat ini.

### C. Responsiveness & Mobile Usability
- **Mobile-First Grid Layout**: Menggunakan `grid-cols-1` pada layar mobile, `md:grid-cols-2` pada tablet, dan `lg:grid-cols-3` pada layar desktop (`max-w-6xl`).
- **Touch-Friendly Controls**: Baris filter departemen mendukung *horizontal scroll* pada layar sempit (`overflow-x-auto`) dan modal otomatis beradaptasi menjadi *bottom sheet* (`items-end sm:items-center`) saat dibuka di perangkat mobile agar mudah dijangkau ibu jari.
- **Accessibility (a11y)**: Dilengkapi dengan atribut semantik (`aria-labelledby`, `role="tablist"`, `role="dialog"`, `aria-modal="true"`) serta dukungan penutupan modal menggunakan tombol `Escape` maupun klik pada *backdrop*.

---

## 3. Catatan Penggunaan AI & Tools (AI Policy Disclosure)

Sesuai kebijakan pada brief (*TOOLS & AI POLICY*), berikut adalah catatan transparan penggunaan AI assistant dalam pengerjaan assignment ini:

- **Tools yang Digunakan**: AI Coding Assistant (Google Antigravity / LLM Assistant).
- **Bagaimana AI Membantu**:
  1. **Penyusunan Mock Data Lowongan**: Membantu men-generate *copywriting* deskripsi pekerjaan, *role highlights*, dan *skill tags* yang relevan dengan konteks produk EdTech Sekolah Karir (tanpa menggunakan data pribadi/konfidensial nyata).
  2. **Refinement Komponen & Aksesibilitas**: Membantu merapikan kelas responsif Tailwind CSS untuk tampilan mobile (*bottom-sheet modal*, *filter pills*) serta memastikan kode bebas dari peringatan ESLint/TypeScript.
  3. **Dokumentasi README**: Membantu menstrukturkan dokumentasi teknis agar ringkas, rapi, dan menjawab seluruh poin kriteria penilaian pada brief.
- Seluruh arsitektur komponen, alur state React (`useState`, `useEffect`), logika filter, dan keputusan UX dipahami sepenuhnya dan dapat dijelaskan secara detail.

---

## 4. Checklist Sebelum Pengumpulan (Submission Checklist)

- [x] **Output sesuai brief**: Satu section landing page recruitment yang responsif dengan headline, beberapa role cards, dan CTA.
- [x] **Responsiveness**: Usable dan rapi di layar mobile (`320px–640px`), tablet (`768px`), hingga desktop (`1024px+`).
- [x] **Mock Data**: Seluruh data lowongan dan simulasi form lamaran menggunakan *mock data* (tidak menyimpan/mengirim data pribadi nyata).
- [x] **README & AI Policy**: Cara menjalankan project, keputusan utama, dan catatan penggunaan AI sudah disertakan.
- [x] **Format Nama File / Repo**: Pastikan saat melakukan *zip* atau memberi nama repository mengikuti format `[NamaLengkap]_WebDeveloper_SKBatch2`.
