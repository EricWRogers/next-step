import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authRecord, Connection, pocketBase, UserConnectionRequest, UserConnections } from "../../PocketbaseConfig";
import Header from "../../Components/Header";
import ProfileCard, { ConnectionStatus } from "../../Components/Profile/ProfileCard";
import MainContent from "../../Components/Profile/MainContent";
import bannerImage from '../../banner-image.png';
import profilePic from '../../profile-pic.jpg';
import { RecordModel } from "pocketbase";
import './ProfilePage.css';

interface UserProfile {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar_url: string;
    my_page: boolean;
    connection_status: string;
}


const ProfilePage: React.FC = () => {
    const { user_id } = useParams();
    const [user, setUser] = useState<RecordModel | null>(null);
    const [myUserData, setMyUserData] = useState<RecordModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.NONE);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loggedInUser = pocketBase.authStore.model as RecordModel;

                const senderId = loggedInUser.id;
                const targetUsername = user_id as string;
                const profileData = await getProfileData(senderId, targetUsername);

                console.log(profileData.avatar_url);
                console.log(profileData.connection_status)

                setUserProfile(profileData);
              } catch (error) {
                console.error("Error:", error);
              }
            /*try {
                const loggedInUser = pocketBase.authStore.model as RecordModel;
                setMyUserData(loggedInUser);

                const data = await pocketBase.collection("users").getFirstListItem(
                    `username="${user_id}"`,
                    { $autoCancel: false }
                );

                setUser(data);

                if (loggedInUser?.id !== data?.id) {
                    await checkConnectionStatus(loggedInUser, data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }*/
        };

        const checkConnectionStatus = async (loggedInUser: RecordModel, data: RecordModel) => {
            let foundConnection = false;
            let newStatus = ConnectionStatus.NONE;

            try {
                const connectionsData = await pocketBase.collection("users_connections")
                    .getOne<UserConnections>(loggedInUser.id);

                if (connectionsData?.connections?.connections.some(connection => connection.id === data.id)) {
                    console.log("found connection");
                    foundConnection = true;
                    newStatus = ConnectionStatus.CONNECTED;
                }
            } catch (error) {
                console.log("no connections");
            }

            if (foundConnection) {
                setConnectionStatus(newStatus);
                return;
            }

            try {
                const userConnectionRequests = await pocketBase.collection("users_connection_request")
                    .getList<UserConnectionRequest>(1, 100, { filter: `sender_id="${loggedInUser.id}"` });

                const foundRequest = userConnectionRequests.items.find(request => request.target_id === data.id);

                if (foundRequest) {
                    let accepted = false;
                    try {
                        const targetConnectionsData = await pocketBase.collection("users_connections")
                            .getOne<UserConnections>(data.id);

                        if (targetConnectionsData?.connections?.connections.some(connection => connection.id === loggedInUser.id)) {
                            accepted = true;
                        }
                    } catch (error) {
                        console.log("Users Connections Database Request Error:", error);
                    }

                    if (accepted) {
                        await pocketBase.collection('users_connection_request').delete(foundRequest.id);
                        await addConnection(loggedInUser, data);
                        newStatus = ConnectionStatus.CONNECTED;
                    } else {
                        newStatus = ConnectionStatus.SENT;
                    }
                    setConnectionStatus(newStatus);
                    return;
                }
            } catch (error) {
                console.log("no request sent");
            }

            try {
                const userConnectionRequests = await pocketBase.collection("users_connection_request")
                    .getList<UserConnectionRequest>(1, 100, { filter: `target_id="${loggedInUser.id}"` });

                if (userConnectionRequests.items.some(request => request.sender_id === data.id)) {
                    newStatus = ConnectionStatus.RECEIVED;
                }
            } catch (error) {
                console.log("no request received");
            }
            setConnectionStatus(newStatus);
        };

        const addConnection = async (loggedInUser: RecordModel, data: RecordModel) => {
            try {
                const connectionsData = await pocketBase.collection("users_connections")
                    .getOne<UserConnections>(loggedInUser.id);

                const connectData: Connection = { id: data.id };

                connectionsData.connections.connections.push(connectData);

                await pocketBase.collection('users_connections')
                    .update(connectionsData.id, connectionsData);

                setConnectionStatus(ConnectionStatus.CONNECTED);
            } catch (error) {
                console.log("Error adding new connection:", error);
            }
        };

        const getProfileData = async (senderId: string, targetUsername: string): Promise<UserProfile> => {
            const url = `http://localhost:8080/profile?sender_id=${senderId}&target_username=${targetUsername}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching profile data: ${response.statusText}`);
            }

            const data: UserProfile = await response.json();
            return data;
        };

        pocketBase.autoCancellation(false);
        fetchUser();
    }, [user_id, navigate]);

    if (userProfile == null) {
        return (
            <div className="app">
                <Header />
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="app">
            <Header />
            <div className="main-layout">
                <ProfileCard
                    bannerImage={bannerImage}
                    profilePic={userProfile.avatar_url || profilePic}
                    name={userProfile.name || "First Last Name"}
                    church="First Baptist Church"
                    location="Magnolia, Arkansas"
                    email={userProfile.email || "email@email.com"}
                    myPage={userProfile.my_page}
                    connectionStatus={ConnectionStatus[userProfile.connection_status as keyof typeof ConnectionStatus]}
                    id={userProfile.id}
                    username={userProfile.username}
                />
                <MainContent />
            </div>
        </div>
    );
};

export default ProfilePage;
