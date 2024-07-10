import React from "react";
import { auth } from '../../FirebaseConfig'

import Header from "../../Components/Header";
import ProfileCard from "../../Components/Profile/ProfileCard";
import MainContent from "../../Components/Profile/MainContent";

import bannerImage from '../../banner-image.png';
import profilePic from '../../profile-pic.jpg';

interface Props {}

const ProfilePage = (props: Props) => {
    return (
        <div className="app">
            <Header/>
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

export default ProfilePage;