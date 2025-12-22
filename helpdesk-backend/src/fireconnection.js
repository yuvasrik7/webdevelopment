import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB6HUPV-gKsajhmCw6iNXmQfdM-9PKObSE",
  authDomain: "student-helpdesk-f4987.firebaseapp.com",
  projectId: "student-helpdesk-f4987",
  storageBucket: "student-helpdesk-f4987.firebasestorage.app",
  messagingSenderId: "260468037622",
  appId: "1:260468037622:web:87cff01aa287a38fc199d7",
  measurementId: "G-4NXF1N791Q"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
export {app,db,analytics};