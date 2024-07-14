import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom'
import { authRecord, pocketBase } from "../../PocketbaseConfig"

import Header from "../../Components/Header";
import ProfileCard from "../../Components/Profile/ProfileCard";
import MainContent from "../../Components/Profile/MainContent";

import bannerImage from '../../banner-image.png';
import profilePic from '../../profile-pic.jpg';
import { RecordModel } from "pocketbase";

import './ProfilePage.css';

interface Props { }

const ProfilePage = () => {
    const { user_id } = useParams();
    const [user, setUser] = useState<RecordModel | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(`username="${user_id}"`);
                const data = await pocketBase.collection("users").getFirstListItem(
                    `username="${user_id}"`,
                    { $autoCancel: false });
                setUser(data);
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
                />
                <MainContent />
            </div>
        </div>
    );
};

export default ProfilePage;