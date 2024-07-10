import React from "react";
import Header from "../../Components/Header";
import Dashboard from "../../Components/Dashboard/Dashboard";

interface Props {}

const DashboardPage = (props: Props) => {
    return (
        <div className="app">
            <Header/>
            <Dashboard/>
        </div>
    );
};

export default DashboardPage;