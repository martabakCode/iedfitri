# Kartu Ucapan Idul Fitri 🌙

Website untuk membuat dan berbagi kartu ucapan Idul Fitri digital. Dibuat dengan Next.js, Supabase, dan Cloudflare R2.

## 🚀 Quick Start

### 1. Clone dan Install

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.local.example` ke `.env.local` dan isi dengan kredensial:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudflare R2
R2_ENDPOINT=your_r2_endpoint
R2_ACCESS_KEY=your_r2_access_key
R2_SECRET_KEY=your_r2_secret_key
R2_BUCKET=your_r2_bucket_name
R2_PUBLIC_URL=your_r2_public_url
```

### 3. Setup Database

1. Buat project di [Supabase](https://supabase.com)
2. Buka SQL Editor
3. Copy dan jalankan query dari [`supabase-setup.sql`](supabase-setup.sql)

### 4. Setup Cloudflare R2

1. Buat bucket di [Cloudflare R2](https://dash.cloudflare.com/?to=/:account/r2)
2. Buat API keys dengan permission Write
3. Note: R2 tidak memerlukan payment method untuk free tier

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📁 Struktur Project

```
src/
├── app/
│   ├── api/wishes/route.ts   # API untuk create wish
│   ├── create/page.tsx       # Halaman buat kartu
│   ├── u/[slug]/page.tsx     # Halaman view kartu
│   ├── page.tsx              # Landing page
│   └── layout.tsx            # Root layout
├── components/
│   ├── WishCard.tsx          # Komponen kartu ucapan
│   ├── WishForm.tsx          # Form buat ucapan
│   └── KetupatDecoration.tsx # Dekorasi ketupat
└── lib/
    ├── supabase.ts            # Supabase client
    └── r2.ts                  # Cloudflare R2 client
```

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Cloudflare R2
- **Deployment**: Vercel

## 📝 Cara Deploy ke Vercel

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables di Vercel dashboard
4. Deploy!

## 🔗 Link Demo

- Landing: https://eidwish.vercel.app
- Create: https://eidwish.vercel.app/create
- View: https://eidwish.vercel.app/u/3f8a92

## 📄 License

MIT
