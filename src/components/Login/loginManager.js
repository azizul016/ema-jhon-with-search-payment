import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}

//sign in button working
export  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
        const {email, displayName, photoURL} = result.user;

        const isSignedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
        }
        return isSignedInUser
        // console.log(email, displayName, photoURL);
        // console.log(result.user);
    })
    .catch(err => {
        console.log(err);
        console.log(err.massage);
    })
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

export const createUserWithEmailAndPassword = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(res.name);
      return newUserInfo;
    })
    .catch( error => {
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
    .catch(function(error) {
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