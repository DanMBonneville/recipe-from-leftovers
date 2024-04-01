import { initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // TODO: find out why this cannot be put in the env file???
  // projectId: process.env.FIREBASE_PROJECT_ID,
  projectId: 'recipe-from-leftovers',
  storageBucket: process.env.FIREBASE_STARAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);
console.log('The env file?? ', process.env.FIREBASE_API_KEY);
const db = getFirestore();
export const ingredientOptionsRef = doc(db, 'ingredients', 'options');
