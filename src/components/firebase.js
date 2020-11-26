import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBW4_BnxhgDzPOD3hOa7hPkgGypZlGXjok",
    authDomain: "spotical-f4e18.firebaseapp.com",
    databaseURL: "https://spotical-f4e18.firebaseio.com",
    projectId: "spotical-f4e18",
    storageBucket: "spotical-f4e18.appspot.com",
    messagingSenderId: "932822542084",
    appId: "1:932822542084:web:a855bcf37d08e042cbd251"
  };

  firebase.initializeApp(firebaseConfig);

  export let db = firebase.firestore();