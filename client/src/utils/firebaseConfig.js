import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDL_7J4EaF7skCkZQhI4p9_I5e9odjpWBU",
    authDomain: "whatsapp-clone-74c95.firebaseapp.com",
    projectId: "whatsapp-clone-74c95",
    storageBucket: "whatsapp-clone-74c95.appspot.com",
    messagingSenderId: "1002277033743",
    appId: "1:1002277033743:web:801ccc6b9969731937d07a",
    measurementId: "G-CJXMC50NJ5"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export {firebaseAuth};