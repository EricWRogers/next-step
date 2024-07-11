import React from 'react';
import './DailyPlannerCard.css';
import useWindowDimensions from '../../WindowHelper';

interface DailyPlannerCardProps { }

const DailyPlannerCard: React.FC<DailyPlannerCardProps> = ({ }) => {
  const { height, width } = useWindowDimensions();

  if (width > 1260) {
    return (
      <div className="daily-planner-card">
        <h2>Daily Planner</h2>
      </div>
    );
  } else {
    return (
      <div className="daily-planner-card-horizanal">
        <h2>Daily Planner</h2>
      </div>
    );
  }
};

export default DailyPlannerCard;

