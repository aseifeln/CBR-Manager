import React, {useState} from 'react';
import { Container, Button } from 'reactstrap';
import AdminSideBar from '../components/AdminSideBar';
import CookieChecker from '../components/CookieChecker';
import CreateAdminAccount from '../components/CreateAdminAccount';

import '../css/AdminDashboard.css';

function AdminDashboard() {
    const [toggleCreateAdmin, setToggleCreateAdmin] = useState(false);

    return(
        <>
            <CookieChecker></CookieChecker>
            <div className='main-content'>
                <AdminSideBar/>

                {toggleCreateAdmin ?
                    <CreateAdminAccount 
                        onClick={() => setToggleCreateAdmin(false)}
                        onSuccess={() => setToggleCreateAdmin(false)}
                    />
                : ''}

                <div className='admin-container'>
                    <h1>Dashboard</h1>
                    <Button onClick={() => setToggleCreateAdmin(true)}>Create New Admin</Button>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;