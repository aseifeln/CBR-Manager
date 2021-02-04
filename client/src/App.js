import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import WorkerList from "./components/WorkerList";
import ClientInfo from "./components/ClientInfo";

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
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={WorkerList}/> {/* Will likely want to put this as dashboard later */}
                            <Route path="/workers" exact component={WorkerList}/>
                            <Route path="/client/:id" exact component={ClientInfo}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
