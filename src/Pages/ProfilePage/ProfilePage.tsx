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
                navigate("/dashboard");
            }
        };

        const getProfileData = async (senderId: string, targetUsername: string): Promise<UserProfile> => {
            const url = `http://localhost:8080/profile?sender_id=${senderId}&target_username=${targetUsername}`;

            const response = await fetch(url);
            if (!response.ok) {
                //throw new Error(`Error fetching profile data: ${response.statusText}`);
                navigate("/dashboard");
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
