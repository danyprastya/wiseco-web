// Firebase Firestore service functions
import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
import {
  PortfolioLogo,
  Project,
  Testimonial,
  StrategicPartner,
  MediaReview,
  WisevisoryServiceItem,
  WisevisoryGalleryItem,
  WisecubationModuleItem,
  WisecubationGalleryItem,
  AdminUser,
  COLLECTIONS,
} from './db-types';

// ============================================
// HELPER FUNCTIONS
// ============================================

function convertTimestamps(doc: DocumentData): DocumentData {
  const data = { ...doc };
  
  // Convert Firestore Timestamps to Dates
  if (data.createdAt instanceof Timestamp) {
    data.createdAt = data.createdAt.toDate();
  }
  if (data.updatedAt instanceof Timestamp) {
    data.updatedAt = data.updatedAt.toDate();
  }
  if (data.lastLoginAt instanceof Timestamp) {
    data.lastLoginAt = data.lastLoginAt.toDate();
  }
  
  return data;
}

function prepareForFirestore<T extends { createdAt?: Date; updatedAt?: Date }>(
  data: Partial<T>,
  isNew: boolean = false
): DocumentData {
  const prepared: DocumentData = { ...data };
  
  // Set timestamps
  const now = Timestamp.now();
  prepared.updatedAt = now;
  if (isNew) {
    prepared.createdAt = now;
  }
  
  // Remove undefined values
  Object.keys(prepared).forEach(key => {
    if (prepared[key] === undefined) {
      delete prepared[key];
    }
  });
  
  return prepared;
}

// ============================================
// GENERIC CRUD OPERATIONS
// ============================================

async function getAll<T>(
  collectionName: string,
  activeOnly: boolean = true
): Promise<T[]> {
  try {
    console.log(`[Firebase] Fetching ${collectionName}, activeOnly: ${activeOnly}`);
    
    // Temporary fix: Try without orderBy first (doesn't require composite index)
    let q;
    if (activeOnly) {
      q = query(
        collection(db, collectionName),
        where('isActive', '==', true)
      );
    } else {
      // Just get all documents without any filter or order
      q = collection(db, collectionName);
    }
    
    const snapshot = await getDocs(q);
    console.log(`[Firebase] ${collectionName} - Found ${snapshot.docs.length} documents`);
    
    const results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data()),
    } as T));
    
    // Sort by index in memory (client-side) instead of server-side
    return results.sort((a, b) => {
      const aWithIndex = a as { index?: number };
      const bWithIndex = b as { index?: number };
      return (aWithIndex.index || 0) - (bWithIndex.index || 0);
    });
  } catch (error) {
    console.error(`[Firebase] Error getting ${collectionName}:`, error);
    console.error(`[Firebase] Error details:`, error instanceof Error ? error.message : 'Unknown');
    return [];
  }
}

async function getById<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data()),
      } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error getting ${collectionName} by id:`, error);
    return null;
  }
}

async function create<T>(
  collectionName: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string | null> {
  try {
    const prepared = prepareForFirestore(data, true);
    const docRef = await addDoc(collection(db, collectionName), prepared);
    return docRef.id;
  } catch (error) {
    console.error(`Error creating ${collectionName}:`, error);
    return null;
  }
}

async function update<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, id);
    const prepared = prepareForFirestore(data, false);
    await updateDoc(docRef, prepared);
    return true;
  } catch (error) {
    console.error(`Error updating ${collectionName}:`, error);
    return false;
  }
}

async function remove(collectionName: string, id: string): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting ${collectionName}:`, error);
    return false;
  }
}

// ============================================
// PORTFOLIO LOGOS
// ============================================

export const portfolioLogosService = {
  getAll: (activeOnly = true) => getAll<PortfolioLogo>(COLLECTIONS.PORTFOLIO_LOGOS, activeOnly),
  getById: (id: string) => getById<PortfolioLogo>(COLLECTIONS.PORTFOLIO_LOGOS, id),
  create: (data: Omit<PortfolioLogo, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<PortfolioLogo>(COLLECTIONS.PORTFOLIO_LOGOS, data),
  update: (id: string, data: Partial<PortfolioLogo>) =>
    update<PortfolioLogo>(COLLECTIONS.PORTFOLIO_LOGOS, id, data),
  delete: (id: string) => remove(COLLECTIONS.PORTFOLIO_LOGOS, id),
};

// ============================================
// PROJECTS
// ============================================

export const projectsService = {
  getAll: (activeOnly = true) => getAll<Project>(COLLECTIONS.PROJECTS, activeOnly),
  getById: (id: string) => getById<Project>(COLLECTIONS.PROJECTS, id),
  create: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<Project>(COLLECTIONS.PROJECTS, data),
  update: (id: string, data: Partial<Project>) =>
    update<Project>(COLLECTIONS.PROJECTS, id, data),
  delete: (id: string) => remove(COLLECTIONS.PROJECTS, id),
};

// ============================================
// TESTIMONIALS
// ============================================

export const testimonialsService = {
  getAll: (activeOnly = true) => getAll<Testimonial>(COLLECTIONS.TESTIMONIALS, activeOnly),
  getById: (id: string) => getById<Testimonial>(COLLECTIONS.TESTIMONIALS, id),
  create: (data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<Testimonial>(COLLECTIONS.TESTIMONIALS, data),
  update: (id: string, data: Partial<Testimonial>) =>
    update<Testimonial>(COLLECTIONS.TESTIMONIALS, id, data),
  delete: (id: string) => remove(COLLECTIONS.TESTIMONIALS, id),
};

// ============================================
// STRATEGIC PARTNERS
// ============================================

export const strategicPartnersService = {
  getAll: (activeOnly = true) => getAll<StrategicPartner>(COLLECTIONS.STRATEGIC_PARTNERS, activeOnly),
  getById: (id: string) => getById<StrategicPartner>(COLLECTIONS.STRATEGIC_PARTNERS, id),
  create: (data: Omit<StrategicPartner, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<StrategicPartner>(COLLECTIONS.STRATEGIC_PARTNERS, data),
  update: (id: string, data: Partial<StrategicPartner>) =>
    update<StrategicPartner>(COLLECTIONS.STRATEGIC_PARTNERS, id, data),
  delete: (id: string) => remove(COLLECTIONS.STRATEGIC_PARTNERS, id),
};

// ============================================
// MEDIA REVIEWS
// ============================================

export const mediaReviewsService = {
  getAll: (activeOnly = true) => getAll<MediaReview>(COLLECTIONS.MEDIA_REVIEWS, activeOnly),
  getById: (id: string) => getById<MediaReview>(COLLECTIONS.MEDIA_REVIEWS, id),
  create: (data: Omit<MediaReview, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<MediaReview>(COLLECTIONS.MEDIA_REVIEWS, data),
  update: (id: string, data: Partial<MediaReview>) =>
    update<MediaReview>(COLLECTIONS.MEDIA_REVIEWS, id, data),
  delete: (id: string) => remove(COLLECTIONS.MEDIA_REVIEWS, id),
};

// ============================================
// WISEVISORY SERVICES
// ============================================

export const wisevisoryServicesService = {
  getAll: (activeOnly = true) => getAll<WisevisoryServiceItem>(COLLECTIONS.WISEVISORY_SERVICES, activeOnly),
  getById: (id: string) => getById<WisevisoryServiceItem>(COLLECTIONS.WISEVISORY_SERVICES, id),
  create: (data: Omit<WisevisoryServiceItem, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<WisevisoryServiceItem>(COLLECTIONS.WISEVISORY_SERVICES, data),
  update: (id: string, data: Partial<WisevisoryServiceItem>) =>
    update<WisevisoryServiceItem>(COLLECTIONS.WISEVISORY_SERVICES, id, data),
  delete: (id: string) => remove(COLLECTIONS.WISEVISORY_SERVICES, id),
};

// ============================================
// WISEVISORY GALLERY
// ============================================

export const wisevisoryGalleryService = {
  getAll: (activeOnly = true) => getAll<WisevisoryGalleryItem>(COLLECTIONS.WISEVISORY_GALLERY, activeOnly),
  getById: (id: string) => getById<WisevisoryGalleryItem>(COLLECTIONS.WISEVISORY_GALLERY, id),
  create: (data: Omit<WisevisoryGalleryItem, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<WisevisoryGalleryItem>(COLLECTIONS.WISEVISORY_GALLERY, data),
  update: (id: string, data: Partial<WisevisoryGalleryItem>) =>
    update<WisevisoryGalleryItem>(COLLECTIONS.WISEVISORY_GALLERY, id, data),
  delete: (id: string) => remove(COLLECTIONS.WISEVISORY_GALLERY, id),
};

// ============================================
// WISECUBATION MODULES
// ============================================

export const wisecubationModulesService = {
  getAll: (activeOnly = true) => getAll<WisecubationModuleItem>(COLLECTIONS.WISECUBATION_MODULES, activeOnly),
  getById: (id: string) => getById<WisecubationModuleItem>(COLLECTIONS.WISECUBATION_MODULES, id),
  create: (data: Omit<WisecubationModuleItem, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<WisecubationModuleItem>(COLLECTIONS.WISECUBATION_MODULES, data),
  update: (id: string, data: Partial<WisecubationModuleItem>) =>
    update<WisecubationModuleItem>(COLLECTIONS.WISECUBATION_MODULES, id, data),
  delete: (id: string) => remove(COLLECTIONS.WISECUBATION_MODULES, id),
};

// ============================================
// WISECUBATION GALLERY
// ============================================

export const wisecubationGalleryService = {
  getAll: (activeOnly = true) => getAll<WisecubationGalleryItem>(COLLECTIONS.WISECUBATION_GALLERY, activeOnly),
  getById: (id: string) => getById<WisecubationGalleryItem>(COLLECTIONS.WISECUBATION_GALLERY, id),
  create: (data: Omit<WisecubationGalleryItem, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<WisecubationGalleryItem>(COLLECTIONS.WISECUBATION_GALLERY, data),
  update: (id: string, data: Partial<WisecubationGalleryItem>) =>
    update<WisecubationGalleryItem>(COLLECTIONS.WISECUBATION_GALLERY, id, data),
  delete: (id: string) => remove(COLLECTIONS.WISECUBATION_GALLERY, id),
};

// ============================================
// ADMIN USERS
// ============================================

export const adminUsersService = {
  getAll: async (activeOnly = true): Promise<AdminUser[]> => {
    try {
      let q;
      if (activeOnly) {
        q = query(
          collection(db, COLLECTIONS.ADMIN_USERS),
          where('isActive', '==', true)
        );
      } else {
        q = query(collection(db, COLLECTIONS.ADMIN_USERS));
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        ...convertTimestamps(doc.data()),
        id: doc.id,
      } as AdminUser));
    } catch (error) {
      console.error('Error getting admin users:', error);
      return [];
    }
  },
  
  getById: (id: string) => getById<AdminUser>(COLLECTIONS.ADMIN_USERS, id),
  
  getByEmail: async (email: string): Promise<AdminUser | null> => {
    try {
      const q = query(
        collection(db, COLLECTIONS.ADMIN_USERS),
        where('email', '==', email.toLowerCase())
      );
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return {
        ...convertTimestamps(doc.data()),
        id: doc.id,
      } as AdminUser;
    } catch (error) {
      console.error('Error getting admin by email:', error);
      return null;
    }
  },
  
  create: (data: Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'>) =>
    create<AdminUser>(COLLECTIONS.ADMIN_USERS, { ...data, email: data.email.toLowerCase() }),
  
  update: (id: string, data: Partial<AdminUser>) =>
    update<AdminUser>(COLLECTIONS.ADMIN_USERS, id, data),
  
  delete: (id: string) => remove(COLLECTIONS.ADMIN_USERS, id),
  
  updateLastLogin: async (id: string): Promise<boolean> => {
    return update<AdminUser>(COLLECTIONS.ADMIN_USERS, id, {
      lastLoginAt: new Date(),
    } as Partial<AdminUser>);
  },
};
