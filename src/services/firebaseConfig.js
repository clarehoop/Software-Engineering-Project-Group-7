// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1FLk36Xkw5FgI45xVNbGqwob366hFWKo",
  authDomain: "group-7-swe-project.firebaseapp.com",
  projectId: "group-7-swe-project",
  storageBucket: "group-7-swe-project.firebasestorage.app",
  messagingSenderId: "510985650693",
  appId: "1:510985650693:web:064f0ec0b960ca78b1926c",
  measurementId: "G-W7SMFHN3G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);