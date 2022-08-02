import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyCCemgU9nJTz7fc9HckvOTQLfUhwaqN54o",
  authDomain: "meuapp-e9587.firebaseapp.com",
  databaseURL: "https://meuapp-e9587-default-rtdb.firebaseio.com",
  projectId: "meuapp-e9587",
  storageBucket: "meuapp-e9587.appspot.com",
  messagingSenderId: "667919190974",
  appId: "1:667919190974:web:0d4b26165e5d381ee787ef",
  measurementId: "G-1K3DM0RXHW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;