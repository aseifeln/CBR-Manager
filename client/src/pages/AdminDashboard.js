import React from 'react';
import { Container} from 'reactstrap';
import AdminSideBar from '../components/AdminSideBar';

function AdminDashboard() {

    return(
        <>
        <AdminSideBar/>
        <Container className="main-content">
            <h1>Dashboard</h1>
        </Container>
        </>
    )
}

export default AdminDashboard;