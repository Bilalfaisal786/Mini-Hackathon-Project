import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { doc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
 
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


 document.addEventListener('DOMContentLoaded', function () {
        const signupForm = document.getElementById('signupForm');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const repeatPasswordInput = document.getElementById('repeatPassword');
        
        signupForm.addEventListener('submit', function (event) {
            if (!validateFirstName() || !validateLastName() || !validateEmail() || !validatePassword() || !validateRepeatPassword()) {
                event.preventDefault();
            }
        });
        
        function validateFirstName() {
            const firstName = firstNameInput.value.trim();
            if (firstName.length < 3 || firstName.length > 20) {
                alert('First name should be between 3 and 20 characters.');
                return false;
            }
            return true;
        }
        
        function validateLastName() {
            const lastName = lastNameInput.value.trim();
            if (lastName.length < 1 || lastName.length > 20) {
                alert('Last name should be between 1 and 20 characters.');
                return false;
            }
            return true;
        }
        
        function validateEmail() {
            const email = emailInput.value.trim();
            if (!email.includes('@')) {
                alert('Invalid email address.');
                return false;
            }
            return true;
        }
        
        function validatePassword() {
            const password = passwordInput.value.trim();
            if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
                alert('Password must be at least 8 characters long and include both uppercase and lowercase letters.');
                return false;
            }
            return true;
        }
        
        function validateRepeatPassword() {
            const password = passwordInput.value.trim();
            const repeatPassword = repeatPasswordInput.value.trim();
            if (password !== repeatPassword) {
                alert('Passwords do not match.');
                return false;
            }
            return true;
        }
    });
    

    let signup_btn = document.getElementById("signup_btn");
signup_btn.addEventListener("click", function() {

    
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      
      
      createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...

        alert ("User Registered Successfully")

        await setDoc(doc(db, "users",user.uid), {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
          });
          

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..

        console.log ("error==>",errorMessage)

    });


    });