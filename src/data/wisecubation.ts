export interface WisecubationModule {
  id: number;
  title: string;
  description: string;
}

export const wisecubationModules: WisecubationModule[] = [
  {
    id: 1,
    title: "Module 1",
    description: "Description for module 1 will be added here.",
  },
  {
    id: 2,
    title: "Module 2",
    description: "Description for module 2 will be added here.",
  },
];

export interface WisecubationGalleryImage {
  id: number;
  src: string;
  alt: string;
}

export const wisecubationGalleryImages: WisecubationGalleryImage[] = [
  {
    id: 1,
    src: "/images/wisecubation/gallery/1.jpg",
    alt: "Gallery Image 1",
  },
  {
    id: 2,
    src: "/images/wisecubation/gallery/2.jpg",
    alt: "Gallery Image 2",
  },
  {
    id: 3,
    src: "/images/wisecubation/gallery/3.jpg",
    alt: "Gallery Image 3",
  },
  {
    id: 4,
    src: "/images/wisecubation/gallery/4.jpg",
    alt: "Gallery Image 4",
  },
  {
    id: 5,
    src: "/images/wisecubation/gallery/5.jpg",
    alt: "Gallery Image 5",
  },
  {
    id: 6,
    src: "/images/wisecubation/gallery/6.jpg",
    alt: "Gallery Image 6",
  },
  {
    id: 7,
    src: "/images/wisecubation/gallery/7.jpg",
    alt: "Gallery Image 7",
  },
  {
    id: 8,
    src: "/images/wisecubation/gallery/8.jpg",
    alt: "Gallery Image 8",
  },
];
