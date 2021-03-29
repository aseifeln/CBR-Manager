import React, {useContext, useEffect,useState} from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import {Table} from 'reactstrap';
import axios from 'axios';

function ShelterSurvey(props){

    const [ ShelterSurvey, setShelterSurvey ] = useState({});
    const [ ShelterSurveyFound, setShelterSurveyFound ] = useState(false);

    useEffect(() => {

        axios.get('baselineSurvey/' + props.id + '/ShelterSurvey')
        .then(response => {
            setShelterSurvey(response.data[0]);
            setShelterSurveyFound(true);
        })
        .catch(error => {
            createSurvey();
            //console.log(error);
            //document.title = "Baseline survey not found";
        })
    },[])

    function createSurvey() {
        setShelterSurvey(
          {
                "ShelterAccess" : "",
                "EssentialsAccess" : "",
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
                  <td>Adequate shelter</td>
                  <td>{ShelterSurvey?.ShelterAccess ? ShelterSurvey.ShelterAccess : ""}</td>
                </tr>
                <tr>
                  <td>Access to essential household items</td>
                  <td>{ShelterSurvey?.EssentialsAccess ? ShelterSurvey.EssentialsAccess : ""}</td>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default ShelterSurvey;