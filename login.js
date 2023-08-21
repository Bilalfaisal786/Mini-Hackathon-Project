import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
 
const firebaseConfig = {
    apiKey: "AIzaSyDkSwX5C3URXbZShC9Ho9e0UhoOXJqPx18",
    authDomain: "hackathon-project-54d06.firebaseapp.com",
    projectId: "hackathon-project-54d06",
    storageBucket: "hackathon-project-54d06.appspot.com",
    messagingSenderId: "340758903446",
    appId: "1:340758903446:web:37c09b8eedc0d1b83960b7"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;


        
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then(() => {
    //             // Redirect to dashboard upon successful login
    //             window.location.href = "dashboard.html";
    //         })
    //         .catch(error => {
    //             console.error("Login error:", error.message);
    //             // Handle login error here (display error message to user, etc.)
    //         });
    // });



    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      window.location.href ="dashboard.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", error.message);
    });
    });





    // Check if the user is already logged in
    // firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //         // Redirect to dashboard if already logged in
    //         window.location.href = "dashboard.html";
    //     }
    // });
});
