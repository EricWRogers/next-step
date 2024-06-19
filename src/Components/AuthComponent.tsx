import React, { useState } from 'react';
import { auth } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import './AuthComponent.css'; // Make sure this path is correct

const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);  // State to toggle between login and register

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: 'https://legacy.reactjs.org/logo-og.png'
      });
      console.log("Registered user:", userCredential.user);
    } catch (error: any) {
      console.error("Error in registration:", error.message);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
    } catch (error: any) {
      console.error("Error in login:", error.message);
    }
  };

  return (
    <div className="auth-container">
      {isNewUser ? (
        <div className="panel">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="First Name" 
              required 
            />
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Last Name" 
              required 
            />
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
            <button type="submit">Register</button>
          </form>
          <br/>
          <a className='AuthPanel_a' onClick={() => setIsNewUser(false)}>Already registered? Log in</a>
        </div>
      ) : (
        <div className="panel">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
            <button type="submit">Login</button>
          </form>
          <br/>
          <a className='AuthPanel_a' onClick={() => setIsNewUser(true)}>Need to register? Sign up</a>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
