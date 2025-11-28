export interface Founder {
  id: number;
  name: string;
  title: string;
  specialization: string;
  description: string;
  image: string;
  linkedin: string;
}

export const founders: Founder[] = [
  {
    id: 1,
    name: "Rizky Wihardi",
    title: "CEO & Managing Partner",
    specialization: "Business Development & Investment",
    description:
      "A strong foundation in business management has been equipped to Rizky Wihardi through experience in entrepreneurship, business development, investment, sales, and IT.",
    image: "/images/aboutus/founders/rizky-wihardi.jpg",
    linkedin: "https://www.linkedin.com/in/rizkywihardi/",
  },
  {
    id: 2,
    name: "Yuri Andiko Tamin, MBA",
    title: "Senior Partner & Financial Advisor",
    specialization: "Finance & Accounting Strategic",
    description:
      "Yuri Tamin's over 25 years of experience in finance, accounting, human resources, and business support has established a solid foundation in financial management.",
    image: "/images/aboutus/founders/yuri-andiko.jpg",
    linkedin: "https://www.linkedin.com/in/yuri-andiko-tamin-839b1315/",
  },
  {
    id: 3,
    name: "N. Andi Kreshna S.E. Akt., CMA",
    title: "Senior Partner & Business Performance Advisor",
    specialization: "Business Performance Management",
    description:
      "Andi Kreshna's over 20 years of expertise in performance management, business planning, finance, and accounting have equipped him with a strong foundation in business management.",
    image: "/images/aboutus/founders/andi-kreshna.jpg",
    linkedin: "https://www.linkedin.com/in/n-andi-kreshna/",
  },
];

export interface FounderCompany {
  id: number;
  name: string;
  logo: string;
}

export const founderCompanies: FounderCompany[] = [
  { id: 1, name: "Indosat", logo: "/images/aboutus/companies/indosat.png" },
  { id: 2, name: "Astra International", logo: "/images/aboutus/companies/astra.png" },
  { id: 3, name: "Kemenkop UKM", logo: "/images/aboutus/companies/kemenkop.png" },
  { id: 4, name: "Goodyear", logo: "/images/aboutus/companies/goodyear.png" },
  { id: 5, name: "Garuda Food", logo: "/images/aboutus/companies/garudafood.png" },
  { id: 6, name: "Telkomsel", logo: "/images/aboutus/companies/telkomsel.png" },
  { id: 7, name: "Accenture", logo: "/images/aboutus/companies/accenture.png" },
  { id: 8, name: "Novartis", logo: "/images/aboutus/companies/novartis.png" },
];

export interface VirtualCLevel {
  id: number;
  name: string;
  title: string;
  image: string;
}

export const virtualCLevels: VirtualCLevel[] = [];

export interface WisecosystemItem {
  id: number;
  name: string;
  logo: string;
  description: string;
}

export const wisecosystemItems: WisecosystemItem[] = [];
