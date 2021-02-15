import React from 'react';

import OutRefs from '../components/OutRef';
import PriorityClients from '../components/PriorityClients';
import AppNavbar from '../components/AppNavbar';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <div id="dashboard">
      <AppNavbar />
        <h2>CBR Dashboard</h2>
       <div className="main">
            <div className="priorityClient">
              <PriorityClients></PriorityClients>
            </div>
            <div className="outRefs">
              <OutRefs></OutRefs>
            </div>
        </div>
    </div>
  )
}

export default Dashboard;