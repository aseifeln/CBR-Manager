import React from 'react';
import { Container, Row } from 'reactstrap';
import AdminSideBar from '../../components/AdminSideBar';
import CookieChecker from '../../components/CookieChecker';
import ReferralStatistics from '../../components/statistics/ReferralStatistics';

function AdminInsights() {

    return(
        <>
            <CookieChecker/>
            <div className='main-content'>
                <AdminSideBar/>

                <div className='admin-container'>
                    <h1>Insights</h1>
                    <ReferralStatistics/>
                </div>

            </div>
        </>
    )
}

export default AdminInsights;