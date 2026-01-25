import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAj55V9GEJCwaTnw0fok5oOWsCbnCZ1ZLc',
  authDomain: 'emrsystem-66346.firebaseapp.com',
  projectId: 'emrsystem-66346',
  storageBucket: 'emrsystem-66346.firebasestorage.app',
  messagingSenderId: '708375905557',
  appId: '1:708375905557:web:5958307329c1f59e58151c',
  measurementId: 'G-K379K17GJ7',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signIn = () => {
  auth.signInWithPopup(googleProvider);
};

const signOut = () => {
  auth.signOut();
};

// ✅ Listen for auth changes
const onAuthStateChange = (callback) => auth.onAuthStateChanged(callback);

export {
  auth,
  signIn,
  signOut,
  onAuthStateChange,
};
