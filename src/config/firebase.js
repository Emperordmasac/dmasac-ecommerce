import * as firebase from "firebase";

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
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
