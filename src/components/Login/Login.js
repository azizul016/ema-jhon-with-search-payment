import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleGoogleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  })

  initializeLoginFramework()

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
 
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const googleSignOut = () => {
    handleGoogleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if (redirect) {
        history.replace(from);
      }
  }

  //Handle Submit
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
   if(newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name, user.email, user.password)
    .then(res => {
      handleResponse(res, true);
    })
   }

   if(!newUser && user.email && user.password){
    signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      handleResponse(res, true);
    })
   }
   e.preventDefault();
  }
 



  //Handle Change
  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value);

    let isFieldValid = true;

    if (e.target.name === 'email') {
      // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isEmailValid);
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPassWordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d+/.test(e.target.value);
      // console.log(passwordHasNumber && isPassWordValid);
      isFieldValid = passwordHasNumber && isPassWordValid
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }






  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={googleSignOut}>Sign out</button> : <button onClick={googleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
                              <p>welcome , {user.name}</p>
                              <p>Your Email: {user.email}</p>
                              <img src={user.photo} alt=""/>
                          </div>
      }

      <h1>Our Own Authentication</h1>
      <form onSubmit={handleSubmit}>
       <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
       <label htmlFor="newUser">New User Sign Up</label>
       <br/>
        {
          newUser &&<input type="text" name='name' onBlur={handleBlur}  placeholder="Your Name"/>
        }
        <br/>
        <input type="text" name="email" onBlur={handleBlur} required placeholder="Your Email Address"/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} required placeholder="Your Password" id=""/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color: 'red', fontSize: '20px'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green', fontSize: '20px'}}>User {newUser ? "Created" : "Logged In"} Successfully</p>
      }
    </div>
  );
}

export default Login;
