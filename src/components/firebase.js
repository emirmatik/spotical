import firebase from "firebase";

var firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx"
  };

  firebase.initializeApp(firebaseConfig);

  export let db = firebase.firestore();
