import React, {useContext, useEffect,useState} from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import {Table} from 'reactstrap';
import axios from 'axios';

function LivelihoodSurvey(props){

    const [ LivelihoodSurvey, setLivelihoodSurvey ] = useState({});
    const [ LivelihoodSurveyFound, setLivelihoodSurveyFound ] = useState(false);

    useEffect(() => {

        axios.get('baselineSurvey/' + props.id + '/LivelihoodSurvey')
        .then(response => {
            setLivelihoodSurvey(response.data[0]);
            setLivelihoodSurveyFound(true);
        })
        .catch(error => {
            createSurvey();
            //console.log(error);
            //document.title = "Baseline survey not found";
        })
    },[])

    function createSurvey() {
        setLivelihoodSurvey(
          {
              "WorkStatus" : "",
              "WorkDescription" : "",
              "EmploymentType" : "",
              "FinancialNeedsMet" : "",
              "DisabilityImpact" : "",
              "WorkWanted" : "",
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
                  <td>Currently working</td>
                  <td>{LivelihoodSurvey?.WorkStatus ? LivelihoodSurvey.WorkStatus : ""}</td>
                </tr>
                <tr>
                  <td>What do you do?</td>
                  <td>{LivelihoodSurvey?.WorkDescription ? LivelihoodSurvey.WorkDescription : ""}</td>
                </tr>
                <tr>
                  <td>Employed or self-employed</td>
                  <td>{LivelihoodSurvey?.EmploymentType ? LivelihoodSurvey.EmploymentType : ""}</td>
                </tr>
                <tr>
                  <td>Does this meet financial needs</td>
                  <td>{LivelihoodSurvey?.FinancialNeedsMet ? LivelihoodSurvey.FinancialNeedsMet : ""}</td>
                </tr>
                <tr>
                  <td>Does your disability affect ability to work</td>
                  <td>{LivelihoodSurvey?.DisabilityImpact ? LivelihoodSurvey.DisabilityImpact : ""}</td>
                </tr>
                <tr>
                  <td>Want work</td>
                  <td>{LivelihoodSurvey?.WorkWanted ? LivelihoodSurvey.WorkWanted : ""}</td>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default LivelihoodSurvey;