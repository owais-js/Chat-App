import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDgAU42tU2UjmOfJuSIZPwf3cutG8ZkqYg",
    authDomain: "to-do-app-a6e91.firebaseapp.com",
    projectId: "to-do-app-a6e91",
    storageBucket: "to-do-app-a6e91.firebasestorage.app",
    messagingSenderId: "649304386131",
    appId: "1:649304386131:web:fe14f32d39e035481f74a6"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth = getAuth(app);
