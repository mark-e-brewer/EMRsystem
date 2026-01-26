import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAj55V9GEJCwaTnw0fok5oOWsCbnCZ1ZLc',
  authDomain: 'emrsystem-66346.firebaseapp.com',
  databaseURL: 'https://emrsystem-66346-default-rtdb.firebaseio.com',
  projectId: 'emrsystem-66346',
  storageBucket: 'emrsystem-66346.firebasestorage.app',
  messagingSenderId: '708375905557',
  appId: '1:708375905557:web:5958307329c1f59e58151c',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const checkUser = async (uid) => {
  const snapshot = await db.ref(`users/${uid}`).once('value');
  return snapshot.val();
};

const signIn = async () => {
  const result = await auth.signInWithPopup(googleProvider);
  const { user } = result;

  const existingUser = await checkUser(user.uid);

  if (!existingUser) {
    await db.ref(`users/${user.uid}`).set({
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      provider: 'google',
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  return user;
};

const signOut = () => auth.signOut();

const onAuthStateChange = (callback) => auth.onAuthStateChanged(callback);

export {
  auth,
  db,
  signIn,
  signOut,
  onAuthStateChange,
  checkUser,
};
