// Database types for Firebase collections
// All image fields store Cloudflare R2 public URLs
// NOTE: Styling (colors, sizes, positions) are handled in frontend components, NOT stored in database

// ============================================
// PORTFOLIO LOGOS (Marquee in PortfolioStats)
// ============================================
// Collection name: portfolio_logos
export interface PortfolioLogo {
  id: string;
  name: string;           // Client/company name
  imageUrl: string;       // Cloudflare R2 public URL
  index: number;          // Order in marquee (ascending)
  isActive: boolean;      // Show/hide logo
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// PROJECTS (Slides in Projects section)
// ============================================
// Collection name: projects
export type ProjectLayoutType = 'bislaf' | 'anns' | 'dusdukduk' | 'iluminen' | 'default';

export interface Project {
  id: string;
  index: number;                    // Slide order (ascending)
  layoutType: ProjectLayoutType;    // Unique layout per project type
  
  // Images
  titleImageUrl: string;            // Title/logo image URL (e.g., Wisevisory logo)
  clientLogoUrl?: string;           // [DEPRECATED] Client company logo URL - use partnerLogos instead
  partnerLogos: string[];           // Array of partner logo URLs
  galleryImages: string[];          // Array of gallery image URLs
  mainImageUrl?: string;            // Main image URL (for bislaf layout)
  
  // Text Content
  title?: string;                   // Optional text title
  subtitle?: string;
  description: string;
  
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// TESTIMONIALS
// ============================================
// Collection name: testimonials
export interface ImagePosition {
  x: number;      // Horizontal position 0-100%
  y: number;      // Vertical position 0-100%
  scale: number;  // Zoom scale 1-2
}

export interface Testimonial {
  id: string;
  index: number;                    // Slide order (ascending)
  
  // Owner Info
  ownerName: string;
  position: string;                 // Job title / position (e.g., "CEO and Co-founder")
  ownerImageUrl: string;            // Owner photo URL
  ownerImagePosition?: ImagePosition; // Owner photo position/crop settings
  
  // Company Info
  companyLogoUrl: string;           // Company logo URL
  
  // Background & Activity
  backgroundImageUrl: string;       // Background image URL
  activityImageUrl: string;         // Activity/kegiatan photo URL
  
  // Testimonial Content
  testimonialText: string;
  boldPhrases: string[];            // Phrases to highlight in bold
  
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// STRATEGIC PARTNERS
// ============================================
// Collection name: strategic_partners
export interface StrategicPartner {
  id: string;
  name: string;
  logoUrl: string;                  // Partner logo URL
  index: number;                    // Display order (ascending)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// MEDIA REVIEWS
// ============================================
// Collection name: media_reviews
export interface MediaReview {
  id: string;
  name: string;
  logoUrl: string;                  // Media logo URL
  index: number;                    // Display order (ascending)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// WISEVISORY SERVICES
// ============================================
// Collection name: wisevisory_services
export interface WisevisoryServiceItem {
  id: string;
  title: string;
  description: string;
  backgroundImageUrl?: string;      // Custom background image URL (optional)
  index: number;                    // Display order (ascending)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// WISEVISORY GALLERY
// ============================================
// Collection name: wisevisory_gallery
export interface WisevisoryGalleryItem {
  id: string;
  imageUrl: string;                 // Gallery image URL
  alt: string;
  index: number;                    // Display order (ascending)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// WISECUBATION MODULES
// ============================================
// Collection name: wisecubation_modules
export interface WisecubationModuleItem {
  id: string;
  title: string;
  description: string;
  backgroundImageUrl?: string;      // Custom background image URL (optional)
  index: number;                    // Display order (ascending)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// WISECUBATION GALLERY
// ============================================
// Collection name: wisecubation_gallery
export interface WisecubationGalleryItem {
  id: string;
  imageUrl: string;                 // Gallery image URL
  alt: string;
  index: number;                    // Display order (ascending)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// ADMIN USERS
// ============================================
// Collection name: admin_users
export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;             // bcrypt hashed password
  name: string;
  role: 'super_admin' | 'admin';
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// COLLECTION NAMES (for easy reference)
// ============================================
export const COLLECTIONS = {
  PORTFOLIO_LOGOS: 'portfolio_logos',
  PROJECTS: 'projects',
  TESTIMONIALS: 'testimonials',
  STRATEGIC_PARTNERS: 'strategic_partners',
  MEDIA_REVIEWS: 'media_reviews',
  WISEVISORY_SERVICES: 'wisevisory_services',
  WISEVISORY_GALLERY: 'wisevisory_gallery',
  WISECUBATION_MODULES: 'wisecubation_modules',
  WISECUBATION_GALLERY: 'wisecubation_gallery',
  ADMIN_USERS: 'admin_users',
} as const;

// ============================================
// R2 FOLDER STRUCTURE
// ============================================
export const R2_FOLDERS = {
  PORTFOLIO_LOGOS: 'portfolio-logos',
  PROJECTS: 'projects',
  TESTIMONIALS: 'testimonials',
  STRATEGIC_PARTNERS: 'strategic-partners',
  MEDIA_REVIEWS: 'media-reviews',
  WISEVISORY_GALLERY: 'wisevisory-gallery',
  WISEVISORY_SERVICES: 'wisevisory-services',
  WISECUBATION_GALLERY: 'wisecubation-gallery',
  WISECUBATION_MODULES: 'wisecubation-modules',
} as const;
