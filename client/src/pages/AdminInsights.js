import React from 'react';
import {Container} from 'reactstrap';
import AdminSideBar from '../components/AdminSideBar';
import CookieChecker from '../components/CookieChecker';

function AdminInsights() {

    return(
        <>
        <CookieChecker></CookieChecker>
        <AdminSideBar/>
        <Container className="main-content">
            <h1>Insights</h1>
        </Container>
        </>
    )
}

export default AdminInsights;