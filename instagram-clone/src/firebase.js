import firebase from 'firebase'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCwosE7dvxGquAGJxPpsM10Tp4Y6-Dp5Zs",
    authDomain: "instagram-clone-f6e0f.firebaseapp.com",
    projectId: "instagram-clone-f6e0f",
    storageBucket: "instagram-clone-f6e0f.appspot.com",
    messagingSenderId: "349407371099",
    appId: "1:349407371099:web:13531eccca292d34b4c47e"
});



const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage()

export { db, auth, storage };