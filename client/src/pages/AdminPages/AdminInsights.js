import React from 'react';
import {Container} from 'reactstrap';
import AdminSideBar from '../../components/AdminSideBar';
import CookieChecker from '../../components/CookieChecker';
import VisitStatistics from '../../components/statistics/VisitStatistics';

function AdminInsights() {

    return(
        <>
        <CookieChecker></CookieChecker>
        <div className='main-content'>
                <AdminSideBar/>

                <div className='admin-container'>
                    <h1>Insights</h1>
                    <VisitStatistics/>
                </div>
            </div>
        </>
    )
}

export default AdminInsights;