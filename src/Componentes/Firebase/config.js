import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5RfGB1H6olHubSyO4ARAr-UPnFGCh8Kc",
  authDomain: "videogames-366f5.firebaseapp.com",
  projectId: "videogames-366f5",
  storageBucket: "videogames-366f5.appspot.com",
  messagingSenderId: "1022961712480",
  appId: "1:1022961712480:web:a05260cbf26fcc5db3b205"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
