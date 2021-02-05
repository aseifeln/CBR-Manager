import React, { Component } from 'react';
import AppNavbar from "./components/AppNavbar";
import WorkerList from "./components/WorkerList";

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

class App extends Component {
    render () {
        return (
            <div className="App">
                <AppNavbar />
                <WorkerList 
                    workers={[]} 
                    getWorkers={()=>{}} 
                    addWorker={()=>{}}
                />
            </div>
        );
    }
}

export default App;
