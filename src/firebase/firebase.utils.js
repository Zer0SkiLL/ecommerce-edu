import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: 'AIzaSyDtfnWYxaVvnb68Hz_HaPpAzOr5x1EQOIk',
    authDomain: 'ecommerce-edu-db.firebaseapp.com',
    projectId: 'ecommerce-edu-db',
    storageBucket: 'ecommerce-edu-db.appspot.com',
    messagingSenderId: '775119343076',
    appId: '1:775119343076:web:5366a0705bb65924e40bf1',
    measurementId: 'G-BPEQEJKBQM',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
