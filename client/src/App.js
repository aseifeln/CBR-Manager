import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import ROUTES, { RenderRoutes } from './routes';
import { UserContext, DefaultContext } from './components/UserContext';
import AppNavbar from './components/AppNavbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './css/App.css';

function App() {

    return (
        <UserContext.Provider value={DefaultContext}>
            <Router>
                {(document.location.pathname !== '/login' && document.location.pathname !== '/signup') ? (
                    <AppNavbar style={{position:"sticky"}}/>
                ):""}
                <RenderRoutes routes={ROUTES}/>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
