import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;