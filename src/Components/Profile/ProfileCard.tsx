import React from 'react';
import './ProfileCard.css';
import { pocketBase, UserConnectionRequest } from '../../PocketbaseConfig';
import { RecordModel } from 'pocketbase';

export enum ConnectionStatus {
  NONE,
  CONNECTED,
  SENT,
  RECEIVED
}

interface ProfileCardProps {
  bannerImage: string;
  profilePic: string;
  name: string;
  church: string;
  location: string;
  email: string;
  myPage: boolean;
  connectionStatus: ConnectionStatus;
  userProileData: RecordModel | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  bannerImage,
  profilePic,
  name,
  church,
  location,
  email,
  myPage,
  connectionStatus,
  userProileData
}) => {

  const onConnectClick = async () => {
    // example create data
    const data = {
      sender_id: (pocketBase.authStore.model as RecordModel).id,
      sender_username: (pocketBase.authStore.model as RecordModel).username,
      target_id: userProileData?.id as string,
      target_username: userProileData?.username as string
    };

    const record = await pocketBase.collection('users_connection_request').create(data);
  };

  if (myPage == false) {
    if (connectionStatus == ConnectionStatus.NONE) {
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
          <button className="connect-button" onClick={onConnectClick}>Connect</button>
        </div>
      );
    }
    else if (connectionStatus == ConnectionStatus.CONNECTED) {
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
          <h2>Connected</h2>
        </div>
      );
    }
    else if (connectionStatus == ConnectionStatus.SENT) {
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
          <h2>Sent</h2>
        </div>
      );
    }
    else /*(connectionStatus == ConnectionStatus.RECEIVED)*/ {
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
          <h2>Received Request</h2>
          <button className="connect-button">Accept</button>
          <button className="connect-button">Deny</button>
        </div>
      );
    }
  }
  else {
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
      </div>
    );
  }

};

export default ProfileCard;

