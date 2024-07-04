// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM8OqlhoElrKJwNPsvr0cgIUZIKOA5Cb8",
  authDomain: "crm-web-5de18.firebaseapp.com",
  projectId: "crm-web-5de18",
  storageBucket: "crm-web-5de18.appspot.com",
  messagingSenderId: "1079994105960",
  appId: "1:1079994105960:web:3ed56a6a4a9494017bfbdd",
  measurementId: "G-9P03J1LB49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };