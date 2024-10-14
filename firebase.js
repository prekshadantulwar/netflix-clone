
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCWPZLk91qCYGxipUsHWNQ_q0zo6TSiDM8",
  authDomain: "netflix-clone-bb7a2.firebaseapp.com",
  projectId: "netflix-clone-bb7a2",
  storageBucket: "netflix-clone-bb7a2.appspot.com",
  messagingSenderId: "794357980939",
  appId: "1:794357980939:web:9aaca9c224d8a6bb930c0e",
  measurementId: "G-5CLBYE84MD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async (name,email,password)=>{

    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password) => {
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout=()=>{
    signOut(auth);
}
export {auth, db, login, signup, logout};