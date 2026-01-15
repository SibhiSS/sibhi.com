import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Note: These are publishable keys - safe to include in frontend code
// You'll need to replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBF2xC_DKzf94LnPFN6RR4wY9oE3fKOmAU",
  authDomain: "nova-cpsc.firebaseapp.com",
  projectId: "nova-cpsc",
  storageBucket: "nova-cpsc.firebasestorage.app",
  messagingSenderId: "284629439290",
  appId: "1:284629439290:web:1ca776f716b8799be9b603",
  measurementId: "G-PXWJTPCVH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider to show account selector
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore
export const db = getFirestore(app);
