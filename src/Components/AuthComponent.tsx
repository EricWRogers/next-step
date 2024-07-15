import React, { useState } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import './AuthComponent.css'; // Make sure this path is correct
import { authRecord, pocketBase, UserConnections } from '../PocketbaseConfig';

const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);  // State to toggle between login and register
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // example create data
      const data = {
        "username": `${firstName}.${lastName}`,
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": password,
        "name": `${firstName} ${lastName}`
      };

      const record : RecordModel = await pocketBase.collection('users').create(data);

      // send an email verification request
      const responce = await pocketBase.collection('users').requestVerification(email);

      // check if the users_connections collection has no entery for this user
      const result = await pocketBase.collection("users_connections").getList<UserConnections>(1, 1, {
        filter: `id="${pocketBase.authStore.model?.id}"`,
        $autoCancel: false
      });

      if (result.items.length == 0)
      {
        const usersConnectionData = {
          "username": pocketBase.authStore.model?.username,
          "connections": '{"connections":[]}'
        }

        await pocketBase.collection('users_connections').create(usersConnectionData);
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error in registration:", error.message);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(`email: ${email}, password: ${password}`)
      const authData = await pocketBase.collection('users').authWithPassword(email, password);

      // check if the users_connections collection has no entery for this user
      const result = await pocketBase.collection("users_connections").getList<UserConnections>(1, 1, {
        filter: `id="${pocketBase.authStore.model?.id}"`,
        $autoCancel: false
      });

      if (result.items.length == 0)
      {
        const usersConnectionData = {
          "username": pocketBase.authStore.model?.username,
          "connections": '{"connections":[]}'
        }

        await pocketBase.collection('users_connections').create(usersConnectionData);
      }

      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error in login:", error.message);
    }
  };

  return (
    <div className="auth-panel">
      {isNewUser ? (
        <div className="auth-container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input 
              type="text"
              className='inputFirstName'
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="First Name" 
              required 
            />
            <input 
              type="text"
              className='inputLastName'
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
        <div className="auth-container">
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
