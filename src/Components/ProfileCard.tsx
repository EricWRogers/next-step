import React from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
  bannerImage: string;
  profilePic: string;
  name: string;
  church: string;
  location: string;
  email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  bannerImage,
  profilePic,
  name,
  church,
  location,
  email
 }) => {
    return (
      <div className="profile-card">
        <img src={bannerImage} alt="Banner" className="profile-banner-image" />
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="profile-details">
          <h2>{name}</h2>
          <p>{church}</p>
          <p>{location}</p>
          <p>{email}</p>
        </div>
        <button className="connect-button">Connect</button>
      </div>
    );
  };
  
  export default ProfileCard;

