import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgRX9khMW4GWtZPD_yDDW1Cbf6xngN84U",
  authDomain: "whatsapp-c5748.firebaseapp.com",
  projectId: "whatsapp-c5748",
  storageBucket: "whatsapp-c5748.appspot.com",
  messagingSenderId: "286547252721",
  appId: "1:286547252721:web:23d537673559a9fad5e050",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export {firebaseAuth};
