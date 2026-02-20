import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd5SlNdTEP-ykh4vyLZAsLRPOXaOK_gl8",
  authDomain: "super-tasty-admin.firebaseapp.com",
  projectId: "super-tasty-admin",
  storageBucket: "super-tasty-admin.firebasestorage.app",
  messagingSenderId: "578115975814",
  appId: "1:578115975814:web:1fb7a73e1b020747336f07"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);