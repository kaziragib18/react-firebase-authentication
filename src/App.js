import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const [error, setError] = useState('');
  const [isLogIn, setIsLogIn] = useState(false);

  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })

  }
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {
    setPassord(e.target.value);
  }

  const toggleLogin = e => {
    setIsLogIn(e.target.checked);
  }

  const handleRegister = e => {
    e.preventDefault();
    console.log(email, password);
    if (password.length < 6) {
      setError('password must be at least 6 characters long')
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Password must contain 2 digit & upper case")
      return;
    }

    if (isLogIn) {
      processLogin(email, password);

    }
    else {
      registerNewUser(email, password);

    }
  }

  const processLogin = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
      .then(result =>{
        const user = result.user;
        console.log(user);
        setError('');
        
      })
      .catch(error =>{
        setError(error.message);
      })
  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
        verifyEmail();
      })
      .catch(error => {
        setError(error.message);
      })

  }
const verifyEmail = () =>{
  sendEmailVerification(auth.currentUser)
  .then( result =>{
    console.log(result);
  })
}

const handleResetPassword = () =>{
  sendPasswordResetEmail(auth, email)
  .then(result =>{

  })
}

  return (
    <div className="p-5">
      <form onSubmit={handleRegister}>
        <h3 className="text-info">Please {isLogIn ? 'login' : 'Register'}</h3>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onChange={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>
        <div className="row mb-2 text-danger">
          {error}
        </div>
        <div class="row mb-3">
          <div class="col-sm-10 offset-sm-2">
            <div class="form-check">

              <input onChange={toggleLogin} class="form-check-input" type="checkbox" id="gridCheck1" />
              <label class="form-check-label" for="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{isLogIn ? 'login' : 'Register'}</button>
        <button type="button" onClick={handleResetPassword} className="btn btn-secondary btn-sm m-1 p-2">Reset Password</button>

      </form>
      <div>=====================</div>
      <br />
      <br />
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
