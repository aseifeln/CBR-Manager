import React, {useContext, useEffect,useState} from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import {Table} from 'reactstrap';
import axios from 'axios';

function HealthSurvey(props){
    const [ HealthSurvey, setHealthSurvey ] = useState({});
    const [ HealthSurveyFound, setHealthSurveyFound ] = useState(false);

    const [ client, setClient ] = useState({});

    useEffect(() => {
        axios.get('baselineSurvey/' + props.id + '/healthSurvey')
        .then(response => {
            setHealthSurvey(response.data[0]);
            setHealthSurveyFound(true);
        })
        .catch(error => {
            createSurvey();
            //console.log(error);
            //document.title = "Baseline survey not found";
        })
    },[])

    function createSurvey() {
        setHealthSurvey(
          {
            "HealthStatus" : "Good",
            "RehabilitationAccess" : "Y",
            "RehabilitationAccessNeeded" : "N",
            "AssistiveDevice" : "Y",
            "AssistiveDeviceWorking" : "Y",
            "AssistiveDeviceNeeded" : "N",
            "AssistiveDeviceRequired" : "N/A",
            "HealthServiceStatus" : "5",
          }
        )
    }

    return(
        <div>
            <Row>
                <Col><h4>Baseline Survey</h4></Col>
            </Row>
            <Table size="sm">
              <thead>
                <tr>
                  <th>Inquiry</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>General Health</td>
                  <td>{HealthSurvey?.HealthStatus ? HealthSurvey.HealthStatus : ""}</td>
                </tr>
                <tr>
                  <td>Current access to rehabilitation services</td>
                  <td>{HealthSurvey?.RehabilitationAccess ? HealthSurvey.RehabilitationAccessNeeded : ""}</td>
                </tr>
                <tr>
                  <td>Need for access to rehabilitation services</td>
                  <td>{HealthSurvey?.RehabilitationAccessNeeded ? HealthSurvey.RehabilitationAccessNeeded : ""}</td>
                </tr>
                <tr>
                  <td>Has assistive device</td>
                  <td>{HealthSurvey?.AssistiveDevice ? HealthSurvey.AssistiveDevice : ""}</td>
                </tr>
                <tr>
                  <td>Assistive device working</td>
                  <td>{HealthSurvey?.AssistiveDeviceWorking ? HealthSurvey.AssistiveDeviceWorking : ""}</td>
                </tr>
                <tr>
                  <td>Assistive device needed</td>
                  <td>{HealthSurvey?.AssistiveDeviceNeeded ? HealthSurvey.AssistiveDeviceNeeded : ""}</td>
                </tr>
                <tr>
                  <td>Which assistive device needed</td>
                  <td> {HealthSurvey?.AssistiveDeviceRequired ? HealthSurvey.AssistiveDeviceRequired : ""}</td>
                </tr>
                <tr>
                  <td>Satisfaction with current health services</td>
                  <td>{HealthSurvey?.HealthServiceStatus ? HealthSurvey.HealthServiceStatus : "" }</td>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default HealthSurvey;