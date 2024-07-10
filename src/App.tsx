import React, { useEffect, useState } from 'react';
import './App.css';

import { auth } from './FirebaseConfig';
import { onAuthStateChanged, User } from "firebase/auth";
import AuthComponent from './Components/AuthComponent';

import { AppRoutes } from './Routes/Routes';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        {user ? <AppRoutes user={user} /> : <AuthComponent />}
      </div>
    </BrowserRouter>
  );
};

export default App;