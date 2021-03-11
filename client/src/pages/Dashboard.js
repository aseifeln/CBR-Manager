import React,{useEffect} from 'react';

import { Container, Row, Col } from 'reactstrap';
import OutRefs from '../components/OutRef';
import PriorityClients from '../components/PriorityClients';
import CookieChecker from '../components/CookieChecker';
import '../css/Dashboard.css';

function Dashboard() {

  useEffect(() => {
    document.title="CBR Dashboard"
  }, [])
  return (
    
    <div id="dashboard">
      <CookieChecker></CookieChecker>
      <Container>
        <Row>
          <Col>
            <h1>CBR Dashboard</h1>
          </Col>
        </Row>
        <Row>
            <Col sm={{size:"auto", offset:1}}>
              <div className="priorityClient" style={{float: 'right'}}>
                <PriorityClients></PriorityClients>
              </div>
            </Col>
            <Col sm={{size:"auto"}}>
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