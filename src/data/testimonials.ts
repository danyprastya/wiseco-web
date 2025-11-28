export interface TestimonialSlide {
  id: number;
  ownerName: string;
  ownerNameColor: string;
  position: string;
  ownerImage: string;
  ownerImagePosition?: string;
  ownerImageScale?: number;
  companyLogo: string;
  companyLogoWidth: number;
  companyLogoHeight: number;
  backgroundImage: string;
  overlayColor: string;
  activityImage: string;
  testimonialText: string;
  boldPhrases: string[];
}

export const testimonialsData: TestimonialSlide[] = [
  {
    id: 1,
    ownerName: "Ben Wirawan",
    ownerNameColor: "#D79C60",
    position: "CEO and Co-founder",
    ownerImage: "/images/testimonies/torch/owner.png",
    companyLogo: "/images/logo marquee klien/Logo Torch.png",
    companyLogoWidth: 139,
    companyLogoHeight: 100,
    backgroundImage: "/images/testimonies/torch/bg-torch.jpg",
    overlayColor: "#2D2D2D",
    activityImage: "/images/testimonies/torch/kegiatan.jpg",
    testimonialText: "Bersama wise dilakukan pengecekan fundamental bisnis, mulai dari finance, management, reputasi, kompetitor, dan stock opname, bahkan dicek juga SOP pengembangan retail. Sebelumnya revenue Torch hanya dari toko online saja, saat ini sedang mengembangkan toko offline, dan Alhamdulillah sudah ada 6 toko offline. Setahun setelah pendampingan dengan wise, Torch juga berhasil dapat sumber pendanaan dari investor baru.",
    boldPhrases: [
      "pengecekan fundamental bisnis",
      "dicek juga SOP pengembangan retail",
      "Torch juga berhasil dapat sumber pendanaan dari investor baru"
    ],
  },
  {
    id: 2,
    ownerName: "Mutiara Kamila",
    ownerNameColor: "#D79C60",
    position: "CEO",
    ownerImage: "/images/testimonies/thenblank/owner.jpeg",
    companyLogo: "/images/testimonies/thenblank/Logo ThenBlank Putih.png",
    companyLogoWidth: 244,
    companyLogoHeight: 88,
    backgroundImage: "/images/testimonies/thenblank/bg-thenblank.avif",
    overlayColor: "#2D2D2D",
    activityImage: "/images/testimonies/thenblank/kegiatan.jpeg",
    testimonialText: "Dengan didampingi oleh wiseco.id, sekarang organisasinya sudah lebih proper & terstruktur, pengelolaan operasional lebih rapi, pengelolaan warehouse lebih teratur, inventory lebih dikelola secara rapi dan tidak banyak terdapat dead stock lagi, serta bahkan THENBLANK sudah memiliki peta pertumbuhan bisnis yang lebih jelas dan terarah.",
    boldPhrases: [],
  },
  {
    id: 3,
    ownerName: "Arief Susanto",
    ownerNameColor: "#D79C60",
    position: "CEO",
    ownerImage: "/images/testimonies/dusdukduk/owner.jpg",
    ownerImagePosition: "center top",
    companyLogo: "/images/logo marquee klien/Logo Dusdukduk.png",
    companyLogoWidth: 80,
    companyLogoHeight: 100,
    backgroundImage: "/images/testimonies/dusdukduk/bg-dusdukduk.webp",
    overlayColor: "#2D2D2D",
    activityImage: "/images/testimonies/dusdukduk/kegiatan.jpg",
    testimonialText: "wiseco.id memberikan banyak sekali paradigma baru dalam bekerja dan berbisnis serta menangani problem-problem pekerjaan. Ini adalah bagian sejarah yang tertulis dari kami, pendamping bisnis pertama kami adalah wiseco.id",
    boldPhrases: [],
  },
];
