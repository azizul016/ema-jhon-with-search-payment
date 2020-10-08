import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
}

//sign in button working
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      const { email, displayName, photoURL } = result.user;

      const isSignedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      setUserToken();
      return isSignedInUser
      // console.log(email, displayName, photoURL);
      // console.log(result.user);
    })
    .catch(err => {
      console.log(err);
      console.log(err.massage);
    })
}

const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    sessionStorage.setItem('token', idToken)
  }).catch(function (error) {
    // Handle error
  });
}

//signOut button worker;
export const handleGoogleSignOut = () => {
  return firebase.auth().signOut()
    .then(result => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      }
      return signOutUser
    })
    .catch(err => {
      console.log(err);
    })
}

//Facebook Sign in;

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    return user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

//Git-Hub Sign in;

export const handleGitHubSignIn = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(gitHubProvider).then(function (result) {
    var token = result.credential.accessToken;
    var user = result.user;
    return user;
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

//Google auth;
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(res.name);
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(function (error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,
    // photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    // Update successful.
    console.log('user name update successfully');
  }).catch(error => {
    // An error happened.
    console.log(error);
  });
}