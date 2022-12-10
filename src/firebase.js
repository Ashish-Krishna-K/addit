import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

import store from './app/store';

import { userLoggedIn } from './features/currentUser.js/currentUserSlice';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAd1urLHkjKAYJ0CqWDr7T5QeHTnSZcEg8",
    authDomain: "addit-c548a.firebaseapp.com",
    projectId: "addit-c548a",
    storageBucket: "addit-c548a.appspot.com",
    messagingSenderId: "681992896969",
    appId: "1:681992896969:web:7e8b6a69730133e548e818"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const auth = getAuth();

const signIn = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log (error)
  }
}

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log (error)
  }
} 

onAuthStateChanged(auth, (user) => {
  if (!user) {
    store.dispatch(userLoggedIn(null));
    return;
  }
  const { displayName, email, photoURL, uid } = user.providerData[0];
  store.dispatch(userLoggedIn( { displayName, email, photoURL, uid } ));
  console.log(displayName);
})


export {
  signIn,
  logOut,
}