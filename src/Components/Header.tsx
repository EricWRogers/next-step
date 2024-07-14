import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import logoIcon from '../logo.png';
import churchIcon from '../placeholder-fbc.png'
import profilePic from '../profile-pic.jpg';
import notificationBackground from '../notification-background.png';
import bannerImage from '../banner-image.png';

import './Header.css';
import { RecordModel } from 'pocketbase';
import { pocketBase } from '../PocketbaseConfig';

  const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const user = pocketBase.authStore.model as RecordModel;

    interface SearchItem {
      first: string;
      last: string;
    }

    var people : SearchItem[] = [
      {
        first: "Eric",
        last: "Rogers",
      },
      {
        first: "Melisa",
        last: "Rogers",
      },
      {
        first: "Andy",
        last: "Rogers",
      },
      {
        first: "Tamie",
        last: "Rogers",
      },
      {
        first: "Kelsey",
        last: "Whitener",
      },
      {
        first: "Jeff",
        last: "Whitener",
      },
    ];

    const handleClick = () => {
      const user = pocketBase.authStore.model as RecordModel;
      if (location.pathname === '/dashboard') {
        navigate('/profile/' + user.username);
      } else {
        navigate('/dashboard');
      }
    };

    const handleSearchFocus = () => {
      setSearchActive(true);
    };
  
    const handleSearchBlur = () => {
      setTimeout(() => setSearchActive(false), 200); // Delay to allow click inside search bubble
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };
  
    const filteredPeople = people.filter(person =>
      `${person.first} ${person.last}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            {Array.from({ length: 6 }).map((_, index) => (
              <img key={index} src={profilePic} alt="Profile Pic" className="logo-icon" />
            ))}
          </div>
          <div className="header-right">
          <div className="header__search-container">
            <input
              type="text"
              className="search"
              placeholder="Search"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isSearchActive && (
              <div className="header__search-bubble">
                <ul>
                  {filteredPeople.map((person, index) => (
                    <li key={index}>{person.first} {person.last}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
            <button className="profile-button" onClick={handleClick}>
              <img src={(pocketBase.getFileUrl(user, user.avatar) as string) || profilePic} alt="Profile" className="profile-icon" />
            </button>
            <img src={notificationBackground} alt="notification" className="notification-icon" />
            <div className="notification-count">3</div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;