import React from 'react';
import { auth, userData } from '../FirebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';

import logoIcon from '../logo.png';
import churchIcon from '../placeholder-fbc.png'
import profilePic from '../profile-pic.jpg';
import notificationBackground from '../notification-background.png';
import bannerImage from '../banner-image.png';

import './Header.css';

  const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
      if (location.pathname === '/dashboard') {
        navigate('/profile/' + userData.firstName + '.' + userData.lastName);
      } else {
        navigate('/dashboard');
      }
    };

    return (
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src={logoIcon} alt="Logo" className="logo-icon" />
            NextStep
            <img src={churchIcon} alt="Church Logo" className="church-icon" />
            |
          </div>
          <div className='header-center'>
            <img src={profilePic} alt="Church Logo" className="logo-icon" />
            <img src={profilePic} alt="Church Logo" className="logo-icon" />
            <img src={profilePic} alt="Church Logo" className="logo-icon" />
            <img src={profilePic} alt="Church Logo" className="logo-icon" />
            <img src={profilePic} alt="Church Logo" className="logo-icon" />
            <img src={profilePic} alt="Church Logo" className="logo-icon" />
          </div>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <button className="profile-button" onClick={handleClick}>
              <img src={(auth.currentUser?.photoURL as string) || profilePic} alt="Profile" className="profile-icon" />
            </button>
            <img src={notificationBackground} alt="notification" className="notification-icon" />
            <div className="notification-count">3</div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;