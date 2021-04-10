import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Collapse, Row, Col } from 'reactstrap';
import AdminSideBar from '../../components/AdminSideBar';
import CookieChecker from '../../components/CookieChecker';
import VisitLocationStatistics from '../../components/statistics/VisitLocationStatistics';
import ReferralStatistics from '../../components/statistics/ReferralStatistics';
import VisitServicesStatistics from '../../components/statistics/VisitServicesStatistics';
import SurveyStatistics from '../../components/statistics/SurveyStatistics';

function AdminInsights() {

    const statFontSize = {fontSize: "20px", fontWeight: "bold"};

    function StatisticsAccordion({ children, header, defaultState }) {

        const [ toggle, setToggle ] = useState(defaultState);

        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col><h2 style={statFontSize}>{header}</h2></Col>
                        <Col>
                            <Button variant="primary" size="md" className="float-right" onClick={() => setToggle(!toggle)}>
                                {(toggle) ? "Hide" : "Expand"}
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <Collapse isOpen={toggle}>
                    <CardBody>
                        {children}
                    </CardBody>
                </Collapse>
            </Card>
        )
    }

    return(
        <>
            <CookieChecker/>
            <div className='main-content'>
                <AdminSideBar/>

                <div className='admin-container'>
                    <h1>Insights</h1>
                    <StatisticsAccordion header="Visit Statistics" defaultState={true}>
                        <VisitLocationStatistics/>
                        <VisitServicesStatistics/>
                    </StatisticsAccordion>
                    <StatisticsAccordion header="Referral Statistics" defaultState={false}>
                        <ReferralStatistics/>
                    </StatisticsAccordion>
                    <StatisticsAccordion header="Baseline Survey Statistics" defaultState={false}>
                        <SurveyStatistics/>
                    </StatisticsAccordion>
                </div>

            </div>
        </>
    )
}

export default AdminInsights;