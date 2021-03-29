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
            "RehabilitationAccess" : true,
            "RehabilitationAccessNeeded" : false,
            "AssistiveDevice" : true,
            "AssistiveDeviceWorking" : true,
            "AssistiveDeviceNeeded" : false,
            "AssistiveDeviceRequired" : "N/A",
            "HealthServiceStatus" : "5",
          }
        )
    }

    function InsertYesOrNoImg(props) {

        if (props.bool == undefined) {
            return (<td>--</td>);
        }
        if (props.bool) {
            //image: https://www.flaticon.com/free-icon/check-mark_1722017
            return (<td> <img src="/checkmark.png" style={{width:22}}/> </td>)
        }
        return (<td> <img src="/redX.png" style={{width:22}}/> </td>);
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
                  <td>{HealthSurvey?.HealthStatus ? HealthSurvey.HealthStatus : "--"}</td>
                </tr>
                <tr>
                  <td>Current access to rehabilitation services</td>
                  <InsertYesOrNoImg bool={HealthSurvey?.RehabilitationAccess}/>
                </tr>
                <tr>
                  <td>Need for access to rehabilitation services</td>
                  <InsertYesOrNoImg bool={HealthSurvey?.RehabilitationAccessNeeded}/>
                </tr>
                <tr>
                  <td>Has assistive device</td>
                  <InsertYesOrNoImg bool={HealthSurvey?.AssistiveDevice}/>
                </tr>
                <tr>
                  <td>Assistive device working</td>
                  <InsertYesOrNoImg bool={HealthSurvey?.AssistiveDeviceWorking}/>
                </tr>
                <tr>
                  <td>Assistive device needed</td>
                  <InsertYesOrNoImg bool={HealthSurvey?.AssistiveDeviceNeeded}/>
                </tr>
                <tr>
                  <td>Which assistive device needed</td>
                  <td> {HealthSurvey?.AssistiveDeviceRequired ? HealthSurvey.AssistiveDeviceRequired : "--"}</td>
                </tr>
                <tr>
                  <td>Satisfaction with current health services</td>
                  <td>{HealthSurvey?.HealthServiceStatus ? HealthSurvey.HealthServiceStatus : "--" }</td>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default HealthSurvey;