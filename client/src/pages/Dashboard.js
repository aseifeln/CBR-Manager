import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import OutRefs from '../components/OutRef';
import PriorityClients from '../components/PriorityClients';
import AppNavbar from '../components/AppNavbar';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <div id="dashboard">
      <AppNavbar />
      <Container>
        <Row>
          <Col>
            <h2>CBR Dashboard</h2>
          </Col>
        </Row>
        <Row>
            <Col sm={{size:'auto',offset:0}}>
              <div className="priorityClient">
                <PriorityClients></PriorityClients>
              </div>
            </Col>
            <Col sm={{size:'auto',offset:0}}>
              <div className="outRefs">
                <OutRefs></OutRefs>
              </div>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard;