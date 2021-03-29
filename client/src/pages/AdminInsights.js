import React from 'react';
import {Container} from 'reactstrap';
import AdminSideBar from '../components/AdminSideBar';
import CookieChecker from '../components/CookieChecker';

function AdminInsights() {

    return(
        <>
        <CookieChecker></CookieChecker>
        <div className='main-content'>
                <AdminSideBar/>

                <div className='admin-container'>
                    <h1>Insights</h1>
                </div>
            </div>
        </>
    )
}

export default AdminInsights;