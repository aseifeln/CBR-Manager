import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container, Media } from 'reactstrap';
import classnames from 'classnames';
import CookieChecker from '../components/CookieChecker';
import AdminSideBar from '../components/AdminSideBar';
import {Link} from 'react-router-dom';
import '../css/WorkerInfo.css'

function WorkerInfo(props){

    const [activeTab, setActiveTab] = useState('1');
    const [activeSubTab, setActiveSubTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    const toggleSubTab = subTab => {
        if(activeSubTab !== subTab) setActiveSubTab(subTab);
    }

    return (
        <div>
          <CookieChecker/>
          <AdminSideBar/>
          <Container className="main-content">
            <Row className="align-items-center">
                <Col xs="auto">
                    <img src="/default-profile.jpg" alt="Profile photo" height="200px" width="200px" style={{borderRadius: "50%"}}/>
                </Col>
                <Col xs="auto">
                    <Row><h2>Denis Onyango</h2></Row>
                    <Row><h5><b>Location:</b> BidiBidi Zone 1</h5></Row>
                </Col>
            </Row>
            <hr/>
            <Row className="summary-stats">
                <Col xs="2"></Col>
                <Col xs="4" className="visit-count">
                    <h5>Visits made in the past week<br/><br/>10</h5>
                </Col>
                <Col xs="4" className="referral-count">
                    <h5>Referrals made in the past week<br/><br/>10</h5>
                </Col>
            </Row>
            <Nav tabs>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '1' }, 'tab-link')}
                    onClick={() => { toggle('1'); }}
                >
                    Visits
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '2' }, 'tab-link')}
                    onClick={() => { toggle('2'); }}
                >
                    Referrals
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '3' }, 'tab-link')}
                    onClick={() => { toggle('3'); }}
                >
                    Stats
                </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane className="tab-content" tabId="1">
                <ul>
                    <li><Link>17-03-2021</Link></li>
                    <li><Link>16-03-2021</Link></li>
                    <li><Link>15-03-2021</Link></li>
                    <li><Link>14-03-2021</Link></li>
                    <li><Link>13-03-2021</Link></li>
                </ul>
                </TabPane>
                <TabPane className="tab-content" tabId="2">
                    <Nav tabs>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeSubTab === '1' }, 'tab-link')}
                            onClick={() => { toggleSubTab('1'); }}
                        >
                            All
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeSubTab === '2' }, 'tab-link')}
                            onClick={() => { toggleSubTab('2'); }}
                        >
                            Made
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeSubTab === '3' }, 'tab-link')}
                            onClick={() => { toggleSubTab('3'); }}
                        >
                            Resolved
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeSubTab}>
                        <TabPane className="tab-content" tabId="1">
                        <ul>
                            <li><Link>17-03-2021</Link></li>
                            <li><Link>16-03-2021</Link></li>
                            <li><Link>15-03-2021</Link></li>
                            <li><Link>14-03-2021</Link></li>
                            <li><Link>13-03-2021</Link></li>
                        </ul>
                        </TabPane>
                        <TabPane className="tab-content" tabId="2">
                        <ul>
                            <li><Link>17-03-2021</Link></li>
                            <li><Link>16-03-2021</Link></li>
                            <li><Link>15-03-2021</Link></li>
                            <li><Link>14-03-2021</Link></li>
                        </ul>
                        </TabPane>
                        <TabPane className="tab-content" tabId="3">
                        <ul>
                            <li><Link>17-03-2021</Link></li>
                            <li><Link>16-03-2021</Link></li>
                            <li><Link>15-03-2021</Link></li>
                        </ul>
                        </TabPane>
                    </TabContent>
                </TabPane>
                <TabPane className="tab-content" tabId="3">
                <Row>
                    <Col sm="12">
                    <h4>Insert some charts and stats here</h4>
                    </Col>
                </Row>
                </TabPane>
            </TabContent>
          </Container>
        </div>
      );
    }

export default WorkerInfo