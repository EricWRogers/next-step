import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import { Connection, pocketBase, UserConnectionRequest, UserConnections } from '../../PocketbaseConfig';
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
  id: string;
  username: string;
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
  id,
  username,
}) => {
  const [status, setStatus] = useState(connectionStatus);

  const onConnectClick = async () => {
    // example create data
    const data = {
      sender_id: (pocketBase.authStore.model as RecordModel).id,
      sender_username: (pocketBase.authStore.model as RecordModel).username,
      target_id: id as string,
      target_username: username as string
    };

    const record = await pocketBase.collection('users_connection_request').create(data);
    setStatus(ConnectionStatus.SENT);
  };

  const onAcceptClick = async () => {
    var connectionsData: UserConnections | null = null;

    // check connection
    try {
      connectionsData = await pocketBase.collection("users_connections")
        .getOne<UserConnections>((pocketBase.authStore.model as RecordModel).id);
    } catch (error) {
      console.log("Todo: add collection data here");
    }

    var connectData: Connection = {
      id: id as string,
    };

    connectionsData?.connections?.connections.push(connectData);

    const record = await pocketBase.collection('users_connections')
      .update(connectionsData?.id as string, connectionsData as any);
    
    setStatus(ConnectionStatus.CONNECTED);
  };

  const onDenyClick = async () => {
    var foundRequest: UserConnectionRequest | null = null;

    // check connection
    try {
      const connectionsRequest = await pocketBase.collection("users_connection_request")
        .getList<UserConnectionRequest>(1, 100, { filter: `sender_id="${id}"` });

      foundRequest = connectionsRequest.items
        .find(request => request.target_id === (pocketBase.authStore.model as RecordModel).id) as UserConnectionRequest;
    } catch (error) {
      console.log("Todo: handle deleting ");
    }

    await pocketBase.collection('users_connection_request')
      .delete(foundRequest?.id as string);
    
    setStatus(ConnectionStatus.NONE);
  };

  useEffect(() => {
    setStatus(connectionStatus);
  }, [connectionStatus]);

  if (myPage == false) {
    if (status == ConnectionStatus.NONE) {
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
    else if (status == ConnectionStatus.CONNECTED) {
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
    else if (status == ConnectionStatus.SENT) {
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
          <button className="connect-button" onClick={onAcceptClick}>Accept</button>
          <button className="connect-button" onClick={onDenyClick}>Deny</button>
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

