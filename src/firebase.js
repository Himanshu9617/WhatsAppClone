
import { initializeApp} from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

//web app's Firebase configuration
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfPDz5SHo6v7M2BpkqaND5QnFqmSzcbMg",
  authDomain: "whatsappclone-93844.firebaseapp.com",
  projectId: "whatsappclone-93844",
  storageBucket: "whatsappclone-93844.appspot.com",
  messagingSenderId: "764799554509",
  appId: "1:764799554509:web:a8090878c9bb110a152a84"
};


//this special line of code connects everything
const app = initializeApp(firebaseConfig);

// this is for database connection
const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


export default db;
