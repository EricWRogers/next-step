import React, { useEffect, useState } from 'react';
import './App.css';

import {loggedIn} from './PocketbaseConfig'
import AuthComponent from './Components/AuthComponent';

import { AppRoutes } from './Routes/Routes';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        {loggedIn() ? <AppRoutes/> : <AuthComponent />}
      </div>
    </BrowserRouter>
  );
};

export default App;