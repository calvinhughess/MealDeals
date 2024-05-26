import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth/';
//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzzYcTYp-nbEtFl7wuCp5hhEk7S6Vbb4o",
  authDomain: "mealdeals-3ca28.firebaseapp.com",
  projectId: "mealdeals-3ca28",
  storageBucket: "mealdeals-3ca28.appspot.com",
  messagingSenderId: "699188406865",
  appId: "1:699188406865:web:0c8fad4980a1d07d456670",
  measurementId: "G-CCET400RM7"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db: Firestore = getFirestore(app);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, db, auth };
