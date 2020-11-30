import firebase from 'firebase/app';
// Realtime database library
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBPC2a8fvEGb0ztOU98Hnfxe_aug25_28I",
    authDomain: "this-day-in-history-4b697.firebaseapp.com",
    databaseURL: "https://this-day-in-history-4b697.firebaseio.com",
    projectId: "this-day-in-history-4b697",
    storageBucket: "this-day-in-history-4b697.appspot.com",
    messagingSenderId: "51185937480",
    appId: "1:51185937480:web:f6c2702a51f3b9ce7abc7d"
}
firebase.initializeApp( firebaseConfig );

export default firebase;