import React from 'react';
import { Link } from 'react-router-dom';

import AppNavbar from "../components/AppNavbar";
import WorkerList from "../components/WorkerList";

function Dashboard() {
  return (
    <div id='dashboard'>
      <AppNavbar />
      <WorkerList 
          workers={[]} 
          getWorkers={()=>{}} 
          addWorker={()=>{}}
      />

      <Link to='/client/new'>Link to new client</Link>
    </div>
  )
}

export default Dashboard;