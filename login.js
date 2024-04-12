
(function () {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB4n4tK3566-k70TAWfW0hPWfdeTQVgB8M",
    authDomain: "courso-7ed85.firebaseapp.com",
    databaseURL: "https://courso-7ed85-default-rtdb.firebaseio.com",
    projectId: "courso-7ed85",
    storageBucket: "courso-7ed85.appspot.com",
    messagingSenderId: "61098800415",
    appId: "1:61098800415:web:f10346e2f6d7bc1f48ac2a",
    measurementId: "G-BSWK26XLL0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // get elements
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const login = document.getElementById("login");
  const signup = document.getElementById("signup");
  const logout = document.getElementById("logout");
  const loggedInStatus = document.getElementById("loggedInStatus");
  const googlelogin = document.getElementById("googlelogin");

  //TODO: Add Google Sign in
  googlelogin.addEventListener("click", (e) => {
    console.log("google sign in clicked");

    // TODO: Use firebase.auth.GoogleAuthProvider() to implement Google sign in
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          var user = result.user;
          loggedInStatus.innerText = `You ${user.profile} logged in using the following email: ${user.email}`;
          login.style.display = "none";
          signup.style.display = "none";
          email.style.display = "none";
          password.style.display = "none";
          googlelogin.style.display = "none";
          logout.style.display = "none";
        })
        
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;

          console.log("errors: "+ errorCode + errorMessage + email + credential);
        });
    // Hint: the user email address is in the results user object: result.user.email
  });

  // login
  login.addEventListener("click", (e) => {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.catch((e) => console.log(e.message));
  });

  // signup
  signup.addEventListener("click", (e) => {
    // TODO: check for real email
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.catch((e) => console.log(e.message));
  });

  // logout
  logout.addEventListener("click", (e) => {
    firebase.auth().signOut();
  });

  // login state
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      loggedInStatus.innerText = `You are logged in using the following email: ${result.user.email}`;
      logout.style.display = "inline";
      login.style.display = "none";
      signup.style.display = "none";
      email.style.display = "none";
      password.style.display = "none";
      googlelogin.style.display = "none";
    } else {
      console.log("User is not logged in");
      loggedInStatus.innerText = "You are not yet logged in";
      login.style.display = "inline";
      signup.style.display = "inline";
      email.style.display = "inline";
      googlelogin.style.display = "inline";
      password.style.display = "inline";
      logout.style.display = "none";
    }
  });
})();
