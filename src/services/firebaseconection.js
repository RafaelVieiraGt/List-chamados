import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import{ getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyD_eqdyLn9ioi3HsUKLJAP03TEHmW0w6Z4",
    authDomain: "tickets-1fa96.firebaseapp.com",
    projectId: "tickets-1fa96",
    storageBucket: "tickets-1fa96.appspot.com",
    messagingSenderId: "44647875929",
    appId: "1:44647875929:web:6cbcd77b75a1723b927848",
    measurementId: "G-FVZTZ3P77W"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  export { auth, db, storage };