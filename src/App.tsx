import React, { useEffect, useState } from 'react';
import Profile from './Components/Profile/Profile';
import './App.css';

import { auth } from './FirebaseConfig';
import { onAuthStateChanged, User } from "firebase/auth";
import AuthComponent from './Components/AuthComponent';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <div className="app">
      {user ? <Profile /> : <AuthComponent />}
    </div>
  );
};

export default App;

