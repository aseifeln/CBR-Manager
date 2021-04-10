import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Collapse, Row, Col } from 'reactstrap';
import AdminSideBar from '../../components/AdminSideBar';
import CookieChecker from '../../components/CookieChecker';
import ReferralStatistics from '../../components/statistics/ReferralStatistics';
import { WorkerTotalVisitsGraph } from '../../components/graphs/WorkerGraphs';
import { WeeklyNewClientsCountGraph } from '../../components/graphs/ClientGraphs'; 

function AdminInsights() {
    return (
        <>
            <CookieChecker/>

            <div className='main-content'>
                <AdminSideBar/>

                <div className='admin-container'>
                    <h1>Insights</h1>

                    <div class='admin-grid'>
                        <div class='admin-card' data-title='CBR Visits (Total)'>
                            <div style={{ height: 300 }}>
                                <WorkerTotalVisitsGraph/>
                            </div>
                        </div>

                        <div class='admin-card' data-title='New Client Signup (Last 7 days)'>
                            <div style={{ height: 300 }}>
                                <WeeklyNewClientsCountGraph/>
                            </div>
                        </div>

                        <div class='admin-card' data-title='Referral Statistics' style={{gridColumn: '1 / -1'}}>
                            <ReferralStatistics/>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminInsights;