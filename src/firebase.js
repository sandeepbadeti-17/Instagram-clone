import firebase from 'firebase'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB6Lw3KkLcTdwiw4QNM9YUJ3UKuf65Voe0",
    authDomain: "instagram-clone-19624.firebaseapp.com",
    projectId: "instagram-clone-19624",
    storageBucket: "instagram-clone-19624.appspot.com",
    messagingSenderId: "962703548208",
    appId: "1:962703548208:web:216203658980582bc3b2f5"
});



const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage()

export { db, auth, storage };