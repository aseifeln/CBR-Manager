import React, {useContext, useEffect,useState} from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import {Table} from 'reactstrap';
import axios from 'axios';

function EducationSurvey(props){

    const [ EducationSurvey, setEducationSurvey ] = useState({});
    const [ EducationSurveyFound, setEducationSurveyFound ] = useState(false);

    const [ client, setClient ] = useState({});

    useEffect(() => {
        axios.get('baselineSurvey/' + props.id + '/EducationSurvey')
        .then(response => {
            setEducationSurvey(response.data[0]);
            setEducationSurveyFound(true);
        })
        .catch(error => {
            createSurvey();
            //console.log(error);
            //document.title = "Baseline survey not found";
        })
    },[])

    function createSurvey() {
        setEducationSurvey(
          {
            "SchoolState" : "",
            "CurrentGrade" : "",
            "NoSchoolReason" : "",
            "SchoolBefore" : "",
            "WantSchool" : "",
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
                  <td>Goes to school</td>
                  <td>{EducationSurvey?.SchoolState ? EducationSurvey.SchoolState : ""}</td>
                </tr>
                <tr>
                  <td>Current Grade</td>
                  <td>{EducationSurvey?.CurrentGrade ? EducationSurvey.CurrentGrade : ""}</td>
                </tr>
                <tr>
                  <td>Reason for not attending school</td>
                  <td>{EducationSurvey?.NoSchoolReason ? EducationSurvey.NoSchoolReason : ""}</td>
                </tr>
                <tr>
                  <td>Has every attended school</td>
                  <td>{EducationSurvey?.SchoolBefore ? EducationSurvey.SchoolBefore : ""}</td>
                </tr>
                <tr>
                  <td>Want to go to school</td>
                  <td>{EducationSurvey?.WantSchool ? EducationSurvey.WantSchool : ""}</td>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default EducationSurvey;