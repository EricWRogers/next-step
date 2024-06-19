import React from 'react';
import Header from './Components/Header';
import ProfileCard from './Components/ProfileCard';
import MainContent from './Components/MainContent';
import bannerImage from './banner-image.png';
import profilePic from './profile-pic.jpg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="main-layout">
        <ProfileCard
          bannerImage={bannerImage}
          profilePic={profilePic}
          name="Eric W. Rogers"
          church="First Baptist Church"
          location="Magnolia, Arkansas"
          email="ericwilliamrogers@gmail.com"
        />
        <MainContent />
      </div>
    </div>
  );
};

export default App;

