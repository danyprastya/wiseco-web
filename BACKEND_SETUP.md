# Backend Setup Guide - Wiseco Web

Panduan ini menjelaskan cara setup backend system untuk Wiseco Web dengan Firebase + Cloudflare R2.

## Arsitektur System

```
┌─────────────────────────────────────────────────────────────────┐
│                        Admin Dashboard                          │
│                    (/admin/dashboard/*)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js API Routes                        │
│  • /api/auth          (Authentication)                          │
│  • /api/upload        (Image Upload/Delete)                     │
│  • /api/data/*        (CRUD Operations)                         │
└─────────────────────────────────────────────────────────────────┘
                    │                   │
                    ▼                   ▼
┌────────────────────────┐    ┌────────────────────────┐
│   Firebase Firestore   │    │    Cloudflare R2       │
│   (Text & Metadata)    │    │   (Image Storage)      │
└────────────────────────┘    └────────────────────────┘
```

## Collections (Database Schema)

| Collection           | Deskripsi                | Images             |
| -------------------- | ------------------------ | ------------------ |
| portfolio_logos      | Logo marquee di homepage | ✅ logoUrl         |
| projects             | Slide project carousel   | ✅ Multiple images |
| testimonials         | Testimonial client       | ✅ Multiple images |
| strategic_partners   | Logo partner strategis   | ✅ logoUrl         |
| media_reviews        | Logo media review        | ✅ logoUrl         |
| wisevisory_services  | Layanan Wisevisory       | ❌ Text only       |
| wisevisory_gallery   | Gallery Wisevisory       | ✅ imageUrl        |
| wisecubation_modules | Module Wisecubation      | ❌ Text only       |
| wisecubation_gallery | Gallery Wisecubation     | ✅ imageUrl        |
| admin_users          | Admin login users        | ❌ Text only       |

## Step 1: Setup Firebase

### 1.1 Buat Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add Project" / "Create a project"
3. Masukkan nama project (misal: `wiseco-web`)
4. Disable Google Analytics (optional)
5. Klik "Create project"

### 1.2 Aktifkan Firestore Database

1. Di sidebar, pilih "Build" > "Firestore Database"
2. Klik "Create database"
3. Pilih "Start in production mode"
4. Pilih lokasi server (asia-southeast2 untuk Indonesia)
5. Klik "Enable"

### 1.3 Setup Firestore Security Rules

Di Firestore Database > Rules, update rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all collections for the website
    match /{collection}/{document=**} {
      allow read: if true;
    }

    // Restrict write access - handled by server-side only
    match /{collection}/{document=**} {
      allow write: if false;
    }
  }
}
```

### 1.4 Aktifkan Authentication

1. Di sidebar, pilih "Build" > "Authentication"
2. Klik "Get started"
3. Di tab "Sign-in method", enable "Email/Password"

### 1.5 Dapatkan Firebase Credentials

1. Klik ikon ⚙️ (Settings) > "Project settings"
2. Scroll ke "Your apps" > Klik ikon Web (</>)
3. Register app dengan nama (misal: `wiseco-web-app`)
4. Copy semua config values

## Step 2: Setup Cloudflare R2

### 2.1 Buat R2 Bucket

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pilih menu "R2 Object Storage" di sidebar
3. Klik "Create bucket"
4. Masukkan nama bucket (misal: `wiseco-images`)
5. Pilih region terdekat
6. Klik "Create bucket"

### 2.2 Buat API Token

1. Di R2 Overview, klik "Manage R2 API Tokens"
2. Klik "Create API token"
3. Beri nama token (misal: `wiseco-upload-token`)
4. Permissions: Pilih bucket yang dibuat, centang semua akses
5. Klik "Create API Token"
6. **PENTING**: Copy dan simpan:
   - Access Key ID
   - Secret Access Key
   - Account ID (lihat di sidebar Cloudflare)

### 2.3 Setup Public Access

1. Masuk ke bucket yang dibuat
2. Klik tab "Settings"
3. Di section "R2.dev subdomain", klik "Allow Access"
4. Copy Public R2.dev Bucket URL

Atau setup Custom Domain:

1. Di tab "Settings", klik "Connect Domain"
2. Masukkan subdomain (misal: `assets.wiseco.id`)
3. Ikuti setup DNS

### 2.4 Setup CORS Policy

1. Di bucket Settings
2. Scroll ke "CORS Policy"
3. Klik "Add CORS policy"
4. Masukkan:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://wiseco.id",
      "https://*.wiseco.id"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```

## Step 3: Setup Environment Variables

### 3.1 Copy .env.example

```bash
cp .env.example .env.local
```

### 3.2 Isi Environment Variables

Edit `.env.local`:

```env
# Firebase Configuration (Firestore Database only - NOT for storage)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wiseco-web.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wiseco-web
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Cloudflare R2 Configuration (for image storage)
CLOUDFLARE_R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_R2_BUCKET_NAME=wiseco-images
CLOUDFLARE_R2_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_R2_PUBLIC_URL=https://pub-xxxxxxxxxxxx.r2.dev

# JWT Secret (generate random string)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Initial Admin User (akan dibuat otomatis saat pertama kali server jalan)
ADMIN_EMAIL=admin@wiseco.id
ADMIN_PASSWORD=WisecoAdmin123!
```

### 3.3 Generate JWT Secret

Jalankan di terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy output dan paste ke `JWT_SECRET`.

## Step 4: Initialize Admin User

### 4.1 Jalankan Development Server

```bash
npm run dev
```

### 4.2 Akses Halaman Login

1. Buka `http://localhost:3000/admin/login`
2. Server akan otomatis membuat admin user berdasarkan `ADMIN_EMAIL` dan `ADMIN_PASSWORD`
3. Login dengan credential tersebut

### 4.3 Verifikasi di Firestore

1. Buka Firebase Console > Firestore
2. Cek collection `admin_users`
3. Pastikan ada document dengan email admin

## Step 5: Test Upload Image

### 5.1 Upload via Dashboard

1. Login ke Admin Dashboard
2. Buka salah satu menu (misal: Portfolio Logos)
3. Klik "Add" dan upload gambar
4. Verifikasi gambar terupload ke R2

### 5.2 Verifikasi di Cloudflare R2

1. Buka Cloudflare Dashboard > R2 > Bucket
2. Lihat folder yang sesuai
3. Pastikan file terupload dengan benar

## Admin Dashboard Pages

| URL                                   | Fungsi                         |
| ------------------------------------- | ------------------------------ |
| /admin/login                          | Halaman login admin            |
| /admin/dashboard                      | Overview statistics            |
| /admin/dashboard/portfolio-logos      | Manage portfolio logos marquee |
| /admin/dashboard/projects             | Manage project carousel slides |
| /admin/dashboard/testimonials         | Manage client testimonials     |
| /admin/dashboard/strategic-partners   | Manage strategic partner logos |
| /admin/dashboard/media-reviews        | Manage media review logos      |
| /admin/dashboard/wisevisory-services  | Manage Wisevisory services     |
| /admin/dashboard/wisevisory-gallery   | Manage Wisevisory gallery      |
| /admin/dashboard/wisecubation-modules | Manage Wisecubation modules    |
| /admin/dashboard/wisecubation-gallery | Manage Wisecubation gallery    |

## API Endpoints

### Authentication

```
POST   /api/auth          - Login
GET    /api/auth          - Get current user
DELETE /api/auth          - Logout
```

### Upload

```
POST   /api/upload        - Upload image to R2
DELETE /api/upload        - Delete image from R2
```

### Data CRUD (semua sama pattern-nya)

```
GET    /api/data/[collection]          - Get all items
POST   /api/data/[collection]          - Create item
PUT    /api/data/[collection]          - Update item
DELETE /api/data/[collection]?id=xxx   - Delete item
```

### Collections:

- portfolio-logos
- projects
- testimonials
- strategic-partners
- media-reviews
- wisevisory-services
- wisevisory-gallery
- wisecubation-modules
- wisecubation-gallery

## Fetching Data di Frontend

### Contoh: Fetch Portfolio Logos

```typescript
// Di komponen React
const [logos, setLogos] = useState([]);

useEffect(() => {
  fetch("/api/data/portfolio-logos")
    .then((res) => res.json())
    .then((data) => setLogos(data.data));
}, []);
```

### Contoh: Fetch dengan activeOnly

```typescript
// Ambil semua (termasuk inactive) - untuk admin
fetch("/api/data/portfolio-logos?activeOnly=false");

// Ambil hanya active (default) - untuk frontend publik
fetch("/api/data/portfolio-logos");
```

## Deployment Notes

### Vercel Deployment

1. Connect repository ke Vercel
2. Set environment variables di Vercel Dashboard
3. Deploy

### Environment Variables di Vercel

Pastikan semua env vars dari `.env.local` diset di Vercel:

- Settings > Environment Variables
- Masukkan semua key-value pairs

### Cloudflare R2 CORS

Update CORS policy untuk production domain:

```json
[
  {
    "AllowedOrigins": ["https://wiseco.id", "https://www.wiseco.id"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```

## Troubleshooting

### Error: "Unauthorized"

- Pastikan sudah login
- Cek token di cookies
- Coba logout dan login ulang

### Error: "Failed to upload"

- Cek R2 credentials di .env
- Verifikasi CORS settings di R2
- Cek bucket permissions

### Error: "Firebase error"

- Verifikasi Firebase credentials
- Cek Firestore rules
- Pastikan Firestore sudah di-enable

### Images tidak muncul

- Cek public URL R2
- Verifikasi bucket public access enabled
- Cek CORS settings

## Image Sync Behavior

Ketika gambar diupdate:

1. Gambar baru diupload ke R2
2. URL lama disimpan untuk penghapusan
3. Setelah upload sukses, gambar lama dihapus dari R2
4. URL baru disimpan ke Firestore

Ketika item dihapus:

1. Semua URL gambar terkait dikumpulkan
2. Semua gambar dihapus dari R2
3. Document dihapus dari Firestore

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx         # Login page
│   │   └── dashboard/
│   │       ├── layout.tsx          # Dashboard layout with sidebar
│   │       ├── page.tsx            # Dashboard home
│   │       ├── portfolio-logos/    # CRUD pages...
│   │       ├── projects/
│   │       ├── testimonials/
│   │       ├── strategic-partners/
│   │       ├── media-reviews/
│   │       ├── wisevisory-services/
│   │       ├── wisevisory-gallery/
│   │       ├── wisecubation-modules/
│   │       └── wisecubation-gallery/
│   └── api/
│       ├── auth/route.ts           # Auth API
│       ├── upload/route.ts         # Upload API
│       └── data/
│           ├── portfolio-logos/route.ts
│           ├── projects/route.ts
│           ├── testimonials/route.ts
│           └── ...
├── components/
│   ├── admin/
│   │   └── ImageUpload.tsx         # Image upload component
│   └── ui/                         # shadcn components
├── lib/
│   ├── firebase.ts                 # Firebase initialization
│   ├── cloudflare-r2.ts           # R2 client & helpers
│   ├── db-types.ts                # TypeScript types
│   ├── firebase-service.ts        # Firestore CRUD services
│   └── auth.ts                    # Authentication helpers
└── middleware.ts                   # Route protection
```

## Support

Jika ada masalah atau pertanyaan, silakan hubungi developer.
