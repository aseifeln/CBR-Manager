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
<<<<<<< HEAD
    
    <div id="container">
=======
    <div id="dashboard">
>>>>>>> 821df5c57a821260883c90b94af3a6ff81af7ab1
      <CookieChecker></CookieChecker>
      <Container>
        <Row>
          <Col>
            <h1>CBR Dashboard</h1>
          </Col>
        </Row>
        <Row>
            <Col>
              <div className="priorityClient">
                <PriorityClients></PriorityClients>
              </div>
            </Col>
            <Col>
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