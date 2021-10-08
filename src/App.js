import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();

function App() {
  const auth = getAuth();
  
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;
      console.log(user);
    })

  }

  return (
    <div className="App">
      <button onClick= {handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
