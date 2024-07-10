import React from "react";
import Header from "../../Components/Header";
import DailyPlannerCard from "../../Components/Dashboard/DailyPlannerCard";
import ChurchCard from "../../Components/Dashboard/ChurchCard";
import GospelCard from "../../Components/Dashboard/GospelCard";
import CommunityCard from "../../Components/Dashboard/CommunityCard";
import RhythmCard from "../../Components/Dashboard/RhythmCard";

import './DashboardPage.css'

interface Props { }

const DashboardPage = (props: Props) => {
    return (
        <div className="app">
            <Header />
            <div className="dashboard-layout">
                <DailyPlannerCard />
                <div className="right-cards-container">
                    <div className="top-row">
                        <ChurchCard />
                        <CommunityCard />
                    </div>
                    <div className="bottom-row">
                        <GospelCard />
                        <RhythmCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;