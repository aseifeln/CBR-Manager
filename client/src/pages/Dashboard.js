import React from 'react';
import { Link } from 'react-router-dom';

import OutRefs from '../components/OutRef';
import PriorityClients from '../components/PriorityClients';
import AppNavbar from '../components/AppNavbar';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <div id="dashboard">
      <AppNavbar />
        <h1>CBR Dashboard</h1>
        <body>
          <PriorityClients></PriorityClients>
          <OutRefs></OutRefs>
        </body>
      <Link to="/client/new">Link to new client</Link>
    </div>
  )
}

export default Dashboard;