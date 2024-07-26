// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmVx3u-obS0JHH5V7tpNWBDsI29gGGvYE",
    authDomain: "e-commerce-website-428bd.firebaseapp.com",
    projectId: "e-commerce-website-428bd",
    storageBucket: "e-commerce-website-428bd.appspot.com",
    messagingSenderId: "147540178257",
    appId: "1:147540178257:web:10d36a3f20fee9066f8f70",
    measurementId: "G-TPC601RGPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

let email = document.getElementById("email");
let password = document.getElementById("password");

window.loginUser = () => {
    let obj = {
        email: email.value,
        password: password.value,
    };
    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(async (res) => {
            const id = res.user.uid;
            const refernce = doc(db, "users", id);
            const snap = await getDoc(refernce);
            if (snap.exists()) {
                localStorage.setItem("user", JSON.stringify(snap.data()));
                window.location.replace("../../index.html");
            } else {
                alert("Data Not Found");
            }
        })
        .catch((err) => {
            alert(err.message);
        });
};
