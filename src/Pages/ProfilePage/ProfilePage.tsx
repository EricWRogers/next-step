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

const ProfilePage: React.FC = () => {
    const { user_id } = useParams();
    const [user, setUser] = useState<RecordModel | null>(null);
    const [myUserData, setMyUserData] = useState<RecordModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.NONE);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
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
            }
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

        pocketBase.autoCancellation(false);
        fetchUser();
    }, [user_id, navigate]);

    if (loading) {
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
                    profilePic={(pocketBase.getFileUrl(user as RecordModel, user?.avatar) as string) || profilePic}
                    name={user?.name || "First Last Name"}
                    church="First Baptist Church"
                    location="Magnolia, Arkansas"
                    email={(user?.email as string) || "email@email.com"}
                    myPage={(user?.id === myUserData?.id)}
                    connectionStatus={connectionStatus}
                    userProileData={user}
                />
                <MainContent />
            </div>
        </div>
    );
};

export default ProfilePage;
