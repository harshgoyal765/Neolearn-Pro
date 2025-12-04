import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-1d469.firebaseapp.com",
  projectId: "loginvirtualcourses-1d469",
  storageBucket: "loginvirtualcourses-1d469.firebasestorage.app",
  messagingSenderId: "398498238101",
  appId: "1:398498238101:web:035501f9b37a831589959c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider} 