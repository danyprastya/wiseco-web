// Script untuk create initial admin user di Firebase
// Run with: node scripts/create-admin.js

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const bcrypt = require('bcryptjs');

// Read .env.local manually
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

// Initialize Firebase
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createAdmin() {
  try {
    const email = env.ADMIN_EMAIL || 'admin@wiseco.id';
    const password = env.ADMIN_PASSWORD || 'WisecoAdmin2025!';
    
    console.log('🔐 Creating admin user...');
    console.log('Email:', email);
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create admin document
    const adminRef = doc(db, 'admin_users', email.toLowerCase().replace(/[^a-z0-9]/g, '_'));
    
    await setDoc(adminRef, {
      email: email.toLowerCase(),
      passwordHash: passwordHash,
      name: 'Admin',
      role: 'super_admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('');
    console.log('🌐 Now you can login at: http://localhost:3000/admin/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
