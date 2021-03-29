import React, {useContext, useEffect,useState} from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import {Table} from 'reactstrap';
import axios from 'axios';

function EmpowermentSurvey(props){

    const [ EmpowermentSurvey, setEmpowermentSurvey ] = useState({});
    const [ EmpowermentSurveyFound, setEmpowermentSurveyFound ] = useState(false);

    useEffect(() => {

        axios.get('baselineSurvey/' + props.id + '/EmpowermentSurvey')
        .then(response => {
            setEmpowermentSurvey(response.data[0]);
            setEmpowermentSurveyFound(true);
        })
        .catch(error => {
            createSurvey();
            //console.log(error);
            //document.title = "Baseline survey not found";
        })
    },[])

    function createSurvey() {
        setEmpowermentSurvey(
          {
              "DisabilityOrganizationMember" : "",
              "DisabilityOrganizations" : "",
              "AwareDisabilityRights" : "",
              "Influential" : "",
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
                  <td>Is a member of a disability organization</td>
                  <td>{EmpowermentSurvey?.DisabilityOrganizationMember ? EmpowermentSurvey.DisabilityOrganizationMember : ""}</td>
                </tr>
                <tr>
                  <td>List of organizations</td>
                  <td>{EmpowermentSurvey?.DisabilityOrganizations ? EmpowermentSurvey.DisabilityOrganizations : ""}</td>
                </tr>
                <tr>
                  <td>Aware of rights</td>
                  <td>{EmpowermentSurvey?.AwareDisabilityRights ? EmpowermentSurvey.AwareDisabilityRights : ""}</td>
                </tr>
                <tr>
                  <td>Feel able to influence people around</td>
                  <td>{EmpowermentSurvey?.Influential ? EmpowermentSurvey.Influential : ""}</td>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default EmpowermentSurvey;