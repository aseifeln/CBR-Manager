import React, { Component } from 'react';
import AppNavbar from "./components/AppNavbar";
import WorkerList from "./components/WorkerList";

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <div className="App">
                    <AppNavbar />
                    <WorkerList />
                </div>
            </Provider>
        );
    }
}

export default App;
