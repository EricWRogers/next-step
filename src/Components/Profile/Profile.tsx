import React from 'react';
import Header from './Header';
import ProfileCard from './ProfileCard';
import MainContent from './MainContent';
import { auth } from '../../FirebaseConfig'
import bannerImage from '../../banner-image.png';
import profilePic from '../../profile-pic.jpg';

const Profile: React.FC = () => {
    return (
      <div className="app">
        <Header />
        <div className="main-layout">
          <ProfileCard
            bannerImage={bannerImage}
            profilePic={(auth.currentUser?.photoURL as string) || profilePic}
            name={auth.currentUser?.displayName || "First Last Name"}
            church="First Baptist Church"
            location="Magnolia, Arkansas"
            email={(auth.currentUser?.email as string) || "email@email.com"}
          />
          <MainContent />
        </div>
      </div>
    );
  };
  
  export default Profile;