import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoIcon from '../logo.png';
import churchIcon from '../placeholder-fbc.png';
import profilePic from '../profile-pic.jpg';
import notificationBackground from '../notification-background.png';
import bannerImage from '../banner-image.png';
import './Header.css';
import { RecordModel } from 'pocketbase';
import { pocketBase } from '../PocketbaseConfig';

interface SearchItem {
  first: string;
  last: string;
  username: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [user, setUser] = useState<RecordModel | null>(null);

  const handleClick = () => {
    if (user) {
      if (location.pathname === '/dashboard') {
        navigate('/profile/' + user.username);
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleSearchFocus = () => {
    setSearchActive(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setSearchActive(false), 200); // Delay to allow click inside search bubble
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const data = await pocketBase.collection("users").getList(1, 10, {
          filter: `username~"${query}"`,
          $autoCancel: false
        });

        const results = data.items.map((item: RecordModel) => ({
          first: (item.name as string).split(" ")[0],
          last: (item.name as string).split(" ")[1],
          username: item.username,
        }));

        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleItemClick = (index: number) => {
    navigate('/profile/' + searchResults[index].username);
    setSearchQuery("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      const firstResult = searchResults[0];
      navigate('/profile/' + firstResult.username);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = pocketBase.authStore.model as RecordModel;
        setUser(loggedInUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <header className="header">
        <div className="header-content">
          <div>Loading...</div>
        </div>
      </header>
    );
  }

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
              onKeyDown={handleKeyPress}
            />
            {isSearchActive && searchQuery && (
              <div className="header__search-bubble">
                <ul>
                  {searchResults.map((person, index) => (
                    <li key={index} onClick={() => handleItemClick(index)}>
                      {person.first} {person.last}
                    </li>
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
