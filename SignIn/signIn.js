import {auth, getAuth, signInWithEmailAndPassword } from "/firebase/firebase.js";

let SignIn_Email = document.getElementById('signInEmail');
let SignIn_Password = document.getElementById('signInPassword');
let signIn_Btn = document.getElementById('signInButton');

signIn_Btn.addEventListener("click", async  () => {
  
  let auth = getAuth();
  
  let Email = SignIn_Email.value;
  let Password = SignIn_Password.value;

  console.log(Email, Password);

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
  try {
    const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
    const user = userCredential.user;
    console.log("User signed in:", user);
    
    // Show success alert and wait for the user to click okie
    await Swal.fire({
      icon: 'success',
      title: 'Sign In Successful',
      text: 'You have successfully signed in!',
    });

   
    location.href = '../post application add Data/addData.html';  } catch (error) {
    const errorCode = error.code;

    // Show SweetAlert based on the error
    if (errorCode === "auth/invalid-credential") {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Credentials',
        text: 'There is no account with this email or the password is incorrect. Please try again.'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sign In Failed',
        text: 'An unexpected error occurred. Please try again.'
      });
    }
  }
});