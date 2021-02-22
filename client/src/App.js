import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ROUTES, { RenderRoutes } from './routes';
import AppNavbar from './components/AppNavbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './css/App.css';

function App() {
    return (
        <Router>
            <AppNavbar style={{position:"sticky"}}/>
            <RenderRoutes routes={ROUTES}/>
        </Router>
    );
}

export default App;
