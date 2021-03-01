import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBJWsUeOODcoU2A1YTubE1ouKNWnKLtw8Y",
    authDomain: "yatassa-chat.firebaseapp.com",
    projectId: "yatassa-chat",
    storageBucket: "yatassa-chat.appspot.com",
    messagingSenderId: "18890177827",
    appId: "1:18890177827:web:7dc6d15f19d999610aa096"
  };

  firebase.initializeApp(firebaseConfig);

  export let db = firebase.firestore();