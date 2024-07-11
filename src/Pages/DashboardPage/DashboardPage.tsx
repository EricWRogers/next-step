import React from "react";
import Header from "../../Components/Header";
import DailyPlannerCard from "../../Components/Dashboard/DailyPlannerCard";
import ChurchCard from "../../Components/Dashboard/ChurchCard";
import GospelCard from "../../Components/Dashboard/GospelCard";
import CommunityCard from "../../Components/Dashboard/CommunityCard";
import RhythmCard from "../../Components/Dashboard/RhythmCard";

import './DashboardPage.css'
import useWindowDimensions from "../../WindowHelper";

interface Props { }

const DashboardPage = (props: Props) => {
    const { height, width } = useWindowDimensions();
    if (width > 1260)
    {
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
    }
    else if (width > 910)
    {
        return (
            <div className="app">
                <Header />
                <div className="dashboard-layout">
                    <div className="right-cards-container">
                        <DailyPlannerCard/>
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
    }
    else
    {
        return (
            <div className="app">
                <Header />
                <DailyPlannerCard />
                <ChurchCard />
                <CommunityCard />
                <GospelCard />
                <RhythmCard />
            </div>
        );
    }
    
};

export default DashboardPage;