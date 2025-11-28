export interface WisevisoryService {
  id: number;
  title: string;
  description: string;
}

export const wisevisoryServices: WisevisoryService[] = [
  {
    id: 1,
    title: "Fundamental Business Review",
    description: "Mapping the current state of the business and conducting an assesment of its operations, administrations, and finance",
  },
  {
    id: 2,
    title: "Fundamental Business Improvement",
    description: "Initiating improvements based on validated priority sequences from the previous Fundamental Business Review process, including mapping the necessary improvement roadmap for the company",
  },
  {
    id: 3,
    title: "Strategic Growth Mapping",
    description: "Mapping the future plan of the business and conducting an assessment of its operations plan, also the administrations, and finances plan",
  },
  {
    id: 4,
    title: "Investment Plan Preparation",
    description: "Crafting investment plans and preparing the best investment strategies",
  },
  {
    id: 5,
    title: "Investment Preparation Advisory",
    description: "Assisting Business Owners and Management in facing investors and seeking preferred investor candidates",
  },
  {
    id: 6,
    title: "Business Operation Advisory",
    description: "Assisting the Business Owner and Management in implementation of current strategy or solving their priority operational issues",
  },
  {
    id: 7,
    title: "Business Model Formulation",
    description: "Mapping the business model to describes the rationale of how an organization creates, delivers, and captures value",
  },
  {
    id: 8,
    title: "Fundamental Brand Development",
    description: "Build and strengthen distinctive values, positioning, and brand image to create positive perceptions and consumer attraction.",
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
