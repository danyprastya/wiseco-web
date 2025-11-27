# Assets Yang Perlu Di-Download dari Wix

Berikut adalah daftar assets yang perlu Anda download dari website Wix dan simpan ke folder yang sesuai:

## 📁 Struktur Folder Assets

```
public/
  images/
    hero-bg.jpg                    # Background untuk hero section
    logo.png                       # Logo wiseco.id

    events/
      archipreneur.jpg             # Event photo Archipreneur

    projects/
      bislaf-project.jpg           # BISLAF project image
      ntb.png                      # NTB region image

    testimonials/
      ben-wirawan.jpg              # Photo Ben Wirawan
      torch-logo.jpg               # Torch company image

    partners/
      alkahf.png                   # Al Kahf logo
      modestalk.png                # Modestalk logo
      # ... partner logos lainnya

    services/
      wisevisory-logo.png          # Logo wisevisory
      wisecubation-logo.png        # Logo wisecubation
      1.png                        # Service icon 1
      2.png                        # Service icon 2
```

## 🔍 Cara Download Assets dari Wix

### 1. **Background Images & Photos**

- Kunjungi: https://wisecoidmedia.wixsite.com/my-site-1-progress
- Buka DevTools (F12)
- Klik kanan pada gambar → "Open image in new tab"
- Save gambar tersebut

**Assets yang perlu didownload:**

- Hero background image (White Shapes_edited.jpg)
- Event photos (Archipreneur.jpg)
- Testimonial photos (Ben Wirawan photo)
- Project images (BISLAF, NTB.png)

### 2. **Logos**

**wiseco.id Main Logo:**

- URL: `https://static.wixstatic.com/media/31e4ad_dc11347c18cf4d72be102b77a4df16c1~mv2.png`
- Simpan sebagai: `public/images/logo.png`

**Service Logos:**

- wisevisory logo → `public/images/services/wisevisory-logo.png`
- wisecubation logo → `public/images/services/wisecubation-logo.png`

**Partner Logos:**

- Al Kahf: `https://static.wixstatic.com/media/31e4ad_accdda2aa3f04b76a499dc9e57a416b0~mv2.png`
- Modestalk: `https://static.wixstatic.com/media/31e4ad_849166b6ac8d4f7897b0512980d229bd~mv2.png`
- Kemenkop Logo: `https://static.wixstatic.com/media/31e4ad_f5fc97dd7e464bb49f5538e76e1c3862~mv2.png`

### 3. **Torch Testimony**

- Ben Wirawan photo
- Torch logo/image: `https://static.wixstatic.com/media/31e4ad_853e414b4b9243018be2e6a935c7e6d7~mv2.jpg`

### 4. **Event Images**

- Archipreneur event: `https://static.wixstatic.com/media/31e4ad_0d9863945ab94974beffb7f121d740f4~mv2.jpg`

### 5. **Project Images**

- BISLAF logo: `https://static.wixstatic.com/media/31e4ad_b0256c37ddc448fe98a170f3a1fb75c2~mv2.png`
- Kemenkop logo: Already listed above
- NTB region: `https://static.wixstatic.com/media/31e4ad_4812fcc9512543feaad15a66c54b99d8~mv2.png`

### 6. **Icons & Decorative Elements**

- networking line icon: `https://static.wixstatic.com/media/31e4ad_f79b3cfe30da4d7181c0645d5d5622b8~mv2.png`
- Various service icons dari Wix

## 📝 Setelah Download:

1. **Optimize Images** (recommended):

   - Gunakan tools seperti TinyPNG, ImageOptim, atau Squoosh
   - Compress tanpa mengurangi kualitas visual
   - Convert ke WebP jika memungkinkan

2. **Update Component Files**:
   Setelah semua assets tersimpan, update path di component-component berikut:
   - `src/components/Hero.tsx` - hero background
   - `src/components/Header.tsx` - logo
   - `src/components/Services.tsx` - service logos
   - `src/components/Events.tsx` - event images
   - `src/components/Testimonials.tsx` - testimonial photos
   - `src/components/Partners.tsx` - partner logos
   - `src/components/Projects.tsx` - project images

## 🎨 Detail Styling yang Terdeteksi

Dari website Wix, berikut detail styling yang sudah saya extract:

### Colors:

- Primary Blue: `#1e3a8a` (approx)
- Secondary: `#0ea5e9` (sky blue)
- Accent: `#f59e0b` (amber/orange)
- Background: White/Light blue gradients

### Typography:

- System fonts stack
- Large, bold headings
- Clean, readable body text

### Spacing:

- Generous padding sections (py-20 = 80px)
- Card spacing: 8-12 gap units
- Container max-width: 1280px (max-w-7xl)

### Component Styling:

- Rounded corners: 8px-16px (`rounded-lg` to `rounded-2xl`)
- Shadows: Soft to medium (`shadow-lg`, `shadow-xl`)
- Hover effects: Subtle translations and shadow increases
- Transitions: All smooth at ~300ms

## ⚡ Quick Start Setelah Assets Ready

```bash
# Jalankan development server
npm run dev

# Buka browser
# http://localhost:3000
```

## 📋 Checklist

- [ ] Download semua images dari Wix
- [ ] Optimize images (compress & convert)
- [ ] Simpan ke folder yang sesuai di `public/images/`
- [ ] Update path images di components
- [ ] Verify semua images muncul
- [ ] Test responsive di berbagai ukuran layar
- [ ] Fine-tune colors jika perlu
- [ ] Adjust spacing jika perlu

## 🎯 Next Steps

1. Download & organize assets
2. Update image paths in components
3. Fine-tune colors dengan color picker dari Wix site
4. Add actual content/text if needed
5. Create additional pages (About Us, Services, etc.)
6. Add animations/transitions if desired
7. SEO optimization (meta tags, etc.)
