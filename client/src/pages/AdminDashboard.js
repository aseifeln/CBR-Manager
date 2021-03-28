import React from 'react';
import AdminSideBar from '../components/AdminSideBar';
import CookieChecker from '../components/CookieChecker';

import '../css/AdminDashboard.css';

function AdminDashboard() {
    return (
        <>
            <CookieChecker/>

            <div className='main-content'>
                <AdminSideBar/>

                <div className='admin-container'>
                    <h1>Dashboard</h1>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;