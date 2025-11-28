export interface WisevisoryService {
  id: number;
  title: string;
  description: string;
}

export const wisevisoryServices: WisevisoryService[] = [
  {
    id: 1,
    title: "Business Strategy",
    description: "Developing comprehensive business strategies to achieve your goals",
  },
  {
    id: 2,
    title: "Financial Advisory",
    description: "Expert financial guidance for sustainable business growth",
  },
  {
    id: 3,
    title: "Operations Management",
    description: "Streamlining operations for maximum efficiency",
  },
  {
    id: 4,
    title: "Market Analysis",
    description: "In-depth market research and competitive analysis",
  },
  {
    id: 5,
    title: "Growth Planning",
    description: "Strategic planning for business expansion and scaling",
  },
  {
    id: 6,
    title: "Risk Assessment",
    description: "Identifying and mitigating business risks effectively",
  },
  {
    id: 7,
    title: "Performance Review",
    description: "Comprehensive evaluation of business performance metrics",
  },
  {
    id: 8,
    title: "Investment Advisory",
    description: "Guidance on investment opportunities and funding strategies",
  },
];

export interface WisevisoryGalleryImage {
  id: number;
  src: string;
  alt: string;
}

export const wisevisoryGalleryImages: WisevisoryGalleryImage[] = [
  {
    id: 1,
    src: "/images/wisevisory/gallery/1.jpg",
    alt: "Gallery Image 1",
  },
  {
    id: 2,
    src: "/images/wisevisory/gallery/2.jpg",
    alt: "Gallery Image 2",
  },
  {
    id: 3,
    src: "/images/wisevisory/gallery/3.jpg",
    alt: "Gallery Image 3",
  },
  {
    id: 4,
    src: "/images/wisevisory/gallery/4.jpg",
    alt: "Gallery Image 4",
  },
  {
    id: 5,
    src: "/images/wisevisory/gallery/5.jpg",
    alt: "Gallery Image 5",
  },
  {
    id: 6,
    src: "/images/wisevisory/gallery/6.jpg",
    alt: "Gallery Image 6",
  },
  {
    id: 7,
    src: "/images/wisevisory/gallery/7.jpg",
    alt: "Gallery Image 7",
  },
  {
    id: 8,
    src: "/images/wisevisory/gallery/8.jpg",
    alt: "Gallery Image 8",
  },
];
