// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAozNFW170yiLTKJ47jn6YfA7xwt-jgG-4",
    authDomain: "portfolio-edcaf.firebaseapp.com",
    databaseURL: "https://portfolio-edcaf.firebaseio.com",
    projectId: "portfolio-edcaf",
    storageBucket: "portfolio-edcaf.appspot.com",
    messagingSenderId: "472597696067",
    appID: "1:472597696067:web:4a00d7a521481eda000ef6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
