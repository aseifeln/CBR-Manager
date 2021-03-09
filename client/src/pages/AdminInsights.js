import React from 'react';
import {Container} from 'reactstrap';
import AdminSideBar from '../components/AdminSideBar';

function AdminInsights() {

    return(
        <>
        <AdminSideBar/>
        <Container className="main-content">
            <h1>Insights</h1>
        </Container>
        </>
    )
}

export default AdminInsights;