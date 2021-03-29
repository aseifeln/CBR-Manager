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
            "SchoolState" : true,
            "CurrentGrade" : "5",
            "NoSchoolReason" : null,
            "SchoolBefore" : true,
            "WantSchool" : true,
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
                  <td>Goes to school</td>
                  <InsertYesOrNoImg bool={EducationSurvey?.SchoolState}/>
                </tr>
                <tr>
                  <td>Current Grade</td>
                  <td>{EducationSurvey?.CurrentGrade ? EducationSurvey.CurrentGrade : "--"}</td>
                </tr>
                <tr>
                  <td>Reason for not attending school</td>
                  <td>{EducationSurvey?.NoSchoolReason ? EducationSurvey.NoSchoolReason : "--"}</td>
                </tr>
                <tr>
                  <td>Has every attended school</td>
                  <InsertYesOrNoImg bool={EducationSurvey?.SchoolBefore}/>
                </tr>
                <tr>
                  <td>Want to go to school</td>
                  <InsertYesOrNoImg bool={EducationSurvey?.WantSchool}/>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default EducationSurvey;