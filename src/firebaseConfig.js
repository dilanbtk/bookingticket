// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDXV_DQSI8pRtyUPo_XsvMBTZD5HCEOjy4",
  authDomain: "ticketapp-8838e.firebaseapp.com",
  databaseURL: "https://ticketapp-8838e-default-rtdb.firebaseio.com",
  projectId: "ticketapp-8838e",
  storageBucket: "ticketapp-8838e.appspot.com",
  messagingSenderId: "930254308105",
  appId: "1:930254308105:web:b26c42e5f8c3e2fa7f49d8",
  measurementId: "G-TY3L3FG1Y3"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };