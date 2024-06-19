import React from 'react';

const MainContent: React.FC = () => {
  return (
    <div className="main-content">
      <nav className="nav-tabs">
        <button className="tab">My Story</button>
        <button className="tab">My Community</button>
        <button className="tab">My Mission</button>
      </nav>
      <div className="content-grid">
        <p>My story my community and my mission</p>
      </div>
    </div>
  );
};

export default MainContent;
