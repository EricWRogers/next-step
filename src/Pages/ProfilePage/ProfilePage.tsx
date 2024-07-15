import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom'
import { authRecord, pocketBase, UserConnectionRequest, UserConnections } from "../../PocketbaseConfig"

import Header from "../../Components/Header";
import ProfileCard, { ConnectionStatus } from "../../Components/Profile/ProfileCard";
import MainContent from "../../Components/Profile/MainContent";

import bannerImage from '../../banner-image.png';
import profilePic from '../../profile-pic.jpg';
import { RecordModel } from "pocketbase";

import './ProfilePage.css';
import { request } from 'http';

interface Props { }

const ProfilePage = () => {
    const { user_id } = useParams();
    const [user, setUser] = useState<RecordModel | null>(null);
    const [myUserData, setMyUserData] = useState<RecordModel | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [connectionStatus, SetConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.NONE)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loggedInUser = pocketBase.authStore.model as RecordModel;
                setMyUserData(loggedInUser);

                const data = await pocketBase.collection("users").getFirstListItem(
                    `username="${user_id}"`,
                    { $autoCancel: false });

                setUser(data);

                // if not the same user then find the connection status
                if (loggedInUser?.id != data?.id) {
                    // check connection
                    try {
                        const connectionsData = await pocketBase.collection("users_connections")
                            .getOne<UserConnections>(loggedInUser.id);

                        if (connectionsData) {
                            if (connectionsData.connections.connections.some(connection => connection.id === data?.id)) {
                                SetConnectionStatus(ConnectionStatus.CONNECTED);
                            }
                        }
                    } catch (error) {
                        console.log("no connections");
                    }

                    // check connection request loggedInUser sent
                    try {
                        const userConnectionRequests = await pocketBase.collection("users_connection_request")
                            .getList<UserConnectionRequest>(1, 100, { filter: `sender_id="${loggedInUser?.id}"` });

                        const foundRequest = userConnectionRequests.items.find(request => request.target_id === data?.id);

                        if (foundRequest) {
                            // they accepted the request remove old request
                            var accepted: boolean = false;
                            try {
                                const connectionsData = await pocketBase.collection("users_connections")
                                    .getOne<UserConnections>(data?.id);
                                if (connectionsData) {
                                    if (connectionsData.connections.connections.some(connection => connection.id === loggedInUser.id)) {
                                        accepted = true;
                                    }
                                }
                            } catch (error) { }

                            if (accepted) {
                                console.log("delete");
                                await pocketBase.collection('users_connection_request').delete(foundRequest.id);
                            }
                            else {
                                SetConnectionStatus(ConnectionStatus.SENT);
                            }
                            return;
                        }
                    } catch (error) {
                        console.log("no request sent");
                    }

                    // check connection request loggedInUser received
                    try {
                        const userConnectionRequests = await pocketBase.collection("users_connection_request")
                            .getList<UserConnectionRequest>(1, 100, { filter: `target_id="${loggedInUser?.id}"` });

                        console.log(userConnectionRequests);

                        if (userConnectionRequests.items.some(request => request.sender_id === data?.id)) {
                            SetConnectionStatus(ConnectionStatus.RECEIVED);
                            return;
                        }
                    } catch (error) {
                        console.log("no request received");
                    }

                }
            } catch (error) {
                pocketBase.autoCancellation(false);

                console.error("Error fetching user data:", error);

                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user_id]);

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
                    myPage={(user?.id == myUserData?.id)}
                    connectionStatus={connectionStatus}
                    userProileData={user}
                />
                <MainContent />
            </div>
        </div>
    );
};

export default ProfilePage;