// Type definitions for project slides
export interface PartnerLogo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectSlide {
  id: number;
  // For custom layout (like BISLAF)
  titleImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  // Secondary logo (like client logo for Ann's Bakery)
  clientLogo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  // For default layout
  title?: string;
  subtitle?: string;
  // Partner logos - can be images or text
  partnerLogos?: PartnerLogo[];
  logos?: string[]; // Text-based logos for default layout
  description: string;
  // Description container size
  descriptionSize?: {
    width: number;
    height: number;
  };
  // Main project image (single image)
  mainImage?: {
    src: string;
    alt: string;
  };
  // Gallery images (multiple images side by side)
  galleryImages?: GalleryImage[];
  // Use custom layout (true) or default layout (false)
  useCustomLayout?: boolean;
  // Layout type for different custom layouts
  layoutType?: "bislaf" | "anns" | "dusdukduk" | "iluminen" | "default";
  // No spacing between title and client logo
  noLogoSpacing?: boolean;
}

// Project data - easily configurable
// To add a new project:
// 1. Add a new object to this array
// 2. Set useCustomLayout: true for image-based title, false for text-based title
// 3. For custom layout: provide titleImage, partnerLogos (images)
// 4. For default layout: provide title, subtitle, logos (text)
// 5. Always provide description and mainImage

export const projectsData: ProjectSlide[] = [
  // 1. Ann's Bakehouse
  {
    id: 1,
    useCustomLayout: true,
    layoutType: "anns",
    titleImage: {
      src: "/images/wisevisory_logo.png",
      alt: "Wisevisory",
      width: 240,
      height: 50,
    },
    clientLogo: {
      src: "/images/logo marquee klien/Logo Ann_s.png",
      alt: "Ann's Bakehouse & Creamery",
      width: 126,
      height: 100,
    },
    description:
      "wiseco.id is honored to collaborate with Ann's Bakehouse & Creamery, supporting its vision of delivering happiness nationwide. This partnership marks a shared commitment to guiding Ann's Bakehouse & Creamery through its investment journey and sustainable business growth, with the hope of achieving long-term success and positive impact.",
    descriptionSize: {
      width: 793,
      height: 50,
    },
    galleryImages: [
      {
        src: "/images/projects/anns-bakery/1.jpg",
        alt: "Ann's Bakehouse 1",
        width: 198,
        height: 226,
      },
      {
        src: "/images/projects/anns-bakery/2.jpg",
        alt: "Ann's Bakehouse 2",
        width: 517,
        height: 226,
      },
      {
        src: "/images/projects/anns-bakery/3.jpg",
        alt: "Ann's Bakehouse 3",
        width: 198,
        height: 226,
      },
    ],
  },
  // 2. Dus Duk Duk
  {
    id: 2,
    useCustomLayout: true,
    layoutType: "dusdukduk",
    noLogoSpacing: true,
    titleImage: {
      src: "/images/wisevisory_logo.png",
      alt: "Wisevisory",
      width: 240,
      height: 50,
    },
    clientLogo: {
      src: "/images/logo marquee klien/Logo Dusdukduk.png",
      alt: "Dus Duk Duk",
      width: 106,
      height: 80,
    },
    description:
      "Dus Duk Duk has partnered with wiseco.id to strengthen its business fundamentals and prepare for corporate growth as a creative company transforming cardboard from 100% recycled fibers. Together, we aim to support Dus Duk Duk's sustainable growth and lasting impact.",
    descriptionSize: {
      width: 793,
      height: 50,
    },
    galleryImages: [
      {
        src: "/images/projects/dusdukduk/1.jpg",
        alt: "Dus Duk Duk 1",
        width: 256,
        height: 226,
      },
      {
        src: "/images/projects/dusdukduk/2.jpg",
        alt: "Dus Duk Duk 2",
        width: 403,
        height: 226,
      },
      {
        src: "/images/projects/dusdukduk/3.jpg",
        alt: "Dus Duk Duk 3",
        width: 256,
        height: 226,
      },
    ],
  },
  // 3. Iluminen
  {
    id: 3,
    useCustomLayout: true,
    layoutType: "iluminen",
    noLogoSpacing: true,
    titleImage: {
      src: "/images/wisevisory_logo.png",
      alt: "Wisevisory",
      width: 240,
      height: 50,
    },
    clientLogo: {
      src: "/images/logo marquee klien/Logo Iluminen.png",
      alt: "Iluminen",
      width: 126,
      height: 100,
    },
    description:
      "Iluminen, a photography and videography brand with 11 years of experience, has partnered with wiseco.id to strengthen its business fundamentals and identify key areas for improvement. Through this collaboration, wiseco.id is committed to supporting Iluminen's sustainable growth and long-term success.",
    descriptionSize: {
      width: 793,
      height: 50,
    },
    galleryImages: [
      {
        src: "/images/projects/iluminen/1.jpg",
        alt: "Iluminen 1",
        width: 493,
        height: 226,
      },
      {
        src: "/images/projects/iluminen/2.jpg",
        alt: "Iluminen 2",
        width: 209,
        height: 226,
      },
      {
        src: "/images/projects/iluminen/3.jpg",
        alt: "Iluminen 3",
        width: 209,
        height: 226,
      },
    ],
  },
  // 4. BISLAF
  {
    id: 4,
    useCustomLayout: true,
    layoutType: "bislaf",
    titleImage: {
      src: "/images/projects/bislaf/BISLAF.png",
      alt: "BISLAF",
      width: 350,
      height: 100,
    },
    partnerLogos: [
      {
        src: "/images/projects/bislaf/kemenkopukm-logo.png",
        alt: "Kemenkop UKM",
      },
      {
        src: "/images/projects/bislaf/wiseco-logo.png",
        alt: "Wiseco",
      },
    ],
    description:
      "2024 - A collaboration between KemenkopUKM RI and wiseco.id to prepare Indonesian SMEs to become fundable businesses. This program was conducted in 6 regions of Indonesia and concluded with pitching to funders at the end of each regional event.",
    mainImage: {
      src: "/images/projects/bislaf/NTB.png",
      alt: "NTB",
    },
  },
];
