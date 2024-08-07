import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDNmG0EljeQrNh-b-Bfh_PeNQmH_1Edpgk",
  authDomain: "luzcolor-beac8.firebaseapp.com",
  projectId: "luzcolor-beac8",
  storageBucket: "luzcolor-beac8.appspot.com",
  messagingSenderId: "961874534813",
  appId: "1:961874534813:web:ed5ed92332d65eea9dcf74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
