
import { initializeApp } from "firebase/app";
import { getAuth} from "./firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB1_v7_rfDZlwstRo3DBtaHnxHaxNTOeY",
  authDomain: "final-assignment-6378c.firebaseapp.com",
  projectId: "final-assignment-6378c",
  storageBucket: "final-assignment-6378c.firebasestorage.app",
  messagingSenderId: "789541506379",
  appId: "1:789541506379:web:6dd8c96abc229d63386cce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);