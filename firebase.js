// firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//const firebaseConfig = {
//  apiKey: "AIzaSyBpImhLKRy2tWkWgxxBj8ELH12O9V7W7d0",
//  authDomain: "pass-vault-2061a.firebaseapp.com",
//  databaseURL: "https://pass-vault-2061a-default-rtdb.firebaseio.com",
//  projectId: "pass-vault-2061a",
//  storageBucket: "pass-vault-2061a.appspot.com",
//  messagingSenderId: "662007711950",
//  appId: "1:662007711950:web:5db1a184fee09368bea89f",
//  measurementId: "G-7L1423XQ8B"
//};
const firebaseConfig = {
  apiKey: "AIzaSyBpImhLKRy2tWkWgxxBj8ELH12O9V7W7d0",
  authDomain: "pass-vault-2061a.firebaseapp.com",
  databaseURL: "https://pass-vault-2061a-default-rtdb.firebaseio.com",
  projectId: "pass-vault-2061a",
  storageBucket: "pass-vault-2061a.firebasestorage.app",
  messagingSenderId: "662007711950",
  appId: "1:662007711950:web:5db1a184fee09368bea89f",
  measurementId: "G-7L1423XQ8B"
};

// Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
