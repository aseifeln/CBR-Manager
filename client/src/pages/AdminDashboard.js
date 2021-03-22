import React from 'react';
import { Container} from 'reactstrap';
import AdminSideBar from '../components/AdminSideBar';
import CookieChecker from '../components/CookieChecker';

function AdminDashboard() {

    return(
        <>
        <CookieChecker></CookieChecker>
        <AdminSideBar/>
        <Container>
            <div className="main-content">
                <h1>Dashboard</h1>
            </div>
        </Container>
        </>
    )
}

export default AdminDashboard;