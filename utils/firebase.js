// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAj55V9GEJCwaTnw0fok5oOWsCbnCZ1ZLc',
  authDomain: 'emrsystem-66346.firebaseapp.com',
  projectId: 'emrsystem-66346',
  storageBucket: 'emrsystem-66346.firebasestorage.app',
  messagingSenderId: '708375905557',
  appId: '1:708375905557:web:5958307329c1f59e58151c',
  measurementId: 'G-K379K17GJ7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
const auth = getAuth(app);

// eslint-disable-next-line import/prefer-default-export
export { auth };
