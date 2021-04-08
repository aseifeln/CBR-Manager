import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Collapse, Row, Col } from 'reactstrap';
import AdminSideBar from '../../components/AdminSideBar';
import CookieChecker from '../../components/CookieChecker';
import ReferralStatistics from '../../components/statistics/ReferralStatistics';

function AdminInsights() {

    const [ showRefStats, setShowRefStats ] = useState(false);
    const statFontSize = {color:"white",fontSize: "20px", fontWeight: "bold"};

    return(
        <>
            <CookieChecker/>
            <div className='main-content'>
                <AdminSideBar/>

                <div className='admin-container'>
                    <h1>Insights</h1>
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col><h2 style={{statFontSize}}>Referral Stats</h2></Col>
                                <Col>
                                    <Button variant="primary" size="md" className="float-right" onClick={() => setShowRefStats(!showRefStats)}>
                                        {(showRefStats) ? "Hide" : "Expand"}
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <Collapse isOpen={showRefStats}>
                            <CardBody>
                                <ReferralStatistics/>
                            </CardBody>
                        </Collapse>
                    </Card>
                </div>

            </div>
        </>
    )
}

export default AdminInsights;