import { auth, getAuth, createUserWithEmailAndPassword } from "./firebase/firebase.js";

let signUp_Email = document.getElementById('SignUpEmail');
let signUp_Password = document.getElementById('signUpPassword');
let signUp_Btn = document.getElementById('signUpBtn');

signUp_Btn.addEventListener('click', (e) => {
 // console.log(e);
  e.preventDefault();

  let Email = signUp_Email.value;
  let Password = signUp_Password.value;
 // console.log("Email => ", Email, "\n", "Password => ", Password);

  // Disable the button and show loading state
  signUp_Btn.textContent = "Loading...";
  signUp_Btn.disabled = true;

  if (!navigator.onLine) {
    Swal.fire({
      icon: 'error',
      title: 'No Internet Connection',
      text: 'Please check your internet connection and try again.',
      confirmButtonText: 'OK', 
    }).then(() => {
      signUp_Btn.textContent = "Sign Up";
      signUp_Btn.disabled = false;
    });
    return;
  }

  let EmailPattren = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!EmailPattren.test(Email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      confirmButtonText: 'OK',
    }).then(() => {
      signUp_Btn.textContent = "Sign Up";
      signUp_Btn.disabled = false;
    });
    return;
  }

  if (Password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Weak Password',
      text: 'Password must be greater than 6 characters.',
      confirmButtonText: 'OK', 
    }).then(() => {
      signUp_Btn.textContent = "Sign Up";
      signUp_Btn.disabled = false;
    });
    return;
  }

  createUserWithEmailAndPassword(auth, Email, Password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        icon: 'success',
        title: 'Sign-Up Successful',
        text: 'Your account has been created successfully!',
        confirmButtonText: 'OK', 
      }).then(() => {
        location.href = '../post application add Data/addData.html';
       });

      signUp_Email.value = "";
      signUp_Password.value = "";
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === "auth/email-already-in-use") {
        Swal.fire({
          icon: 'error',
          title: 'Email Already in Use',
          text: 'This email is already in use. Please use a different email.',
          confirmButtonText: 'OK', 
        });
      } else if (errorCode === "auth/invalid-email") {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: 'The email address is not valid. Please enter a valid email.',
          confirmButtonText: 'OK', 
        });
      } else if (errorCode === "auth/weak-password") {
        Swal.fire({
          icon: 'error',
          title: 'Weak Password',
          text: 'The password is too weak. Please choose a stronger password.',
          confirmButtonText: 'OK', 
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
          confirmButtonText: 'OK', 
        });
      }
    })
    .finally(() => {
      signUp_Btn.textContent = "Sign Up";
      signUp_Btn.disabled = false;
    });
});
