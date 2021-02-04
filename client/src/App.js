import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
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
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" component={WorkerList}/> {/* Will likely want to put this as dashboard later */}
                            <Route path="/workers" component={WorkerList}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
