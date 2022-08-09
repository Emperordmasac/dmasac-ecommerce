import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8YNJxpW04Y7mt5ulMzhKOvvEDphwckq4",
    authDomain: "dmasac-ecommerce.firebaseapp.com",
    projectId: "dmasac-ecommerce",
    storageBucket: "dmasac-ecommerce.appspot.com",
    messagingSenderId: "891545091554",
    appId: "1:891545091554:web:e1022148835ba3bd250dbb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
