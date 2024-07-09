import React from 'react';
import { auth } from '../FirebaseConfig';
import logoIcon from '../logo.png';
import churchIcon from '../placeholder-fbc.png'
import profilePic from '../profile-pic.jpg';
import notificationBackground from '../notification-background.png';
import bannerImage from '../banner-image.png';
import './Header.css'; // Create this CSS file for header-specific styles

  const Header: React.FC = () => {
    return (
      <header className="header">
        <img src={bannerImage} alt="Banner" className="banner-image" />
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
            <button className="profile-button">
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