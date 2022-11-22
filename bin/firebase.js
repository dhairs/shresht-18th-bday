import firebase from "firebase/app";
var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: "AIzaSyC-LUw2ttCE9_e17BWR-hBYBDYqAaEPHJg",
    authDomain: "shresht.firebaseapp.com",
    projectId: "shresht",
    storageBucket: "shresht.appspot.com",
    messagingSenderId: "1038020124834",
    appId: "1:1038020124834:web:48771fa155b57954ce77fb",
    measurementId: "G-5LZJXLDQ5W",
  });
}

export default app;
