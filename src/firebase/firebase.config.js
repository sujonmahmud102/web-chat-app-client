// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvjxLnm7XkXXe0NnWyDVArdM0BakyGhYw",
    authDomain: "web-chat-app-ddfce.firebaseapp.com",
    projectId: "web-chat-app-ddfce",
    storageBucket: "web-chat-app-ddfce.appspot.com",
    messagingSenderId: "789115096064",
    appId: "1:789115096064:web:bb53ad3bf50e9d8d30dce5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;