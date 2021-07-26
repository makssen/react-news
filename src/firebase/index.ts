import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD7mvPi91_fe9H4v593miAqN1om4SmNJAM",
    authDomain: "react-news-e7943.firebaseapp.com",
    projectId: "react-news-e7943",
    storageBucket: "react-news-e7943.appspot.com",
    messagingSenderId: "502971615670",
    appId: "1:502971615670:web:6f2c41f6f9238948a15917"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const storage = firebase.storage();
const { FieldValue } = firebase.firestore;

export { auth, provider, db, storage, FieldValue };