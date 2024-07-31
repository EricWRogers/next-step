import React from "react";
import Header from "../../Components/Header";
import DailyPlannerCard from "../../Components/Dashboard/DailyPlannerCard";
import ChurchCard from "../../Components/Dashboard/ChurchCard";
import GospelCard from "../../Components/Dashboard/GospelCard";
import CommunityCard from "../../Components/Dashboard/CommunityCard";
import RhythmCard from "../../Components/Dashboard/RhythmCard";
import MultipleChoiceQuestion from "../../Components/Questions/MultipleChoiceQuestion";
import TrueFalseQuestion from "../../Components/Questions/TrueFalseQuestion";
import ShortAnswerQuestion from "../../Components/Questions/ShortAnswerQuestion";
import EssayQuestion from "../../Components/Questions/EssayQuestion";

import './DashboardPage.css'
import useWindowDimensions from "../../WindowHelper";

interface Props { }

const DashboardPage = (props: Props) => {
    const { height, width } = useWindowDimensions();

    const handleAnswer = (answer: string) => {
        console.log('Selected answer:', answer);
    };

    if (width > 1260) {
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
    else if (width > 910) {
        return (
            <div className="app">
                <Header />
                <div className="dashboard-layout">
                    <div className="right-cards-container">
                        <DailyPlannerCard />
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
                <MultipleChoiceQuestion
                    question="What is your favorite programming language?"
                    options={['JavaScript', 'Python', 'Java', 'C++']}
                    onAnswer={handleAnswer}
                    id="00000"
                />
                <TrueFalseQuestion
                    question="Is it noon?"
                    onAnswer={handleAnswer}
                    id="00001"
                />
                <ShortAnswerQuestion
                    question="What is your name?"
                    onAnswer={handleAnswer}
                    id="00002"
                    charWidth={49}
                />
                <EssayQuestion
                    question="Describe your experience with programming."
                    onAnswer={handleAnswer}
                    id="00003"
                    charWidth={49}
                    charHeight={4}
                />
            </div>
        );
    }
    else {
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