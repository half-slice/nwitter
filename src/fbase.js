import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJTy1-RIMMYnvY4k-siGxKBfLz5eVbQso",
    authDomain: "nwitter-b68c5.firebaseapp.com",
    projectId: "nwitter-b68c5",
    storageBucket: "nwitter-b68c5.appspot.com",
    messagingSenderId: "659384664170",
    appId: "1:659384664170:web:595dc0e6e8aba582ff0a13",
    measurementId: "G-SCFVFREJHR"
};


initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();

//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);