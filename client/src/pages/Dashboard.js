import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import OutRefs from '../components/OutRef';
import PriorityClients from '../components/PriorityClients';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <div id="dashboard">
      <Container>
        <Row>
          <Col>
            <h1>CBR Dashboard</h1>
          </Col>
        </Row>
        <Row>
            <Col sm={{size:"auto",offset:0}}>
              <div className="priorityClient">
                <PriorityClients></PriorityClients>
              </div>
            </Col>
            <Col sm={{size:"auto" ,offset:2}}>
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