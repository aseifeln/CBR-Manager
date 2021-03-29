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
              "WorkStatus" : false,
              "WorkDescription" : "",
              "EmploymentType" : "",
              "FinancialNeedsMet" : false,
              "DisabilityImpact" : true,
              "WorkWanted" : true,
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
                  <td>Currently working</td>
                  <InsertYesOrNoImg bool={LivelihoodSurvey?.WorkStatus}/>
                </tr>
                <tr>
                  <td>What do you do?</td>
                  <td>{LivelihoodSurvey?.WorkDescription ? LivelihoodSurvey.WorkDescription : "--"}</td>
                </tr>
                <tr>
                  <td>Employed or self-employed</td>
                  <td>{LivelihoodSurvey?.EmploymentType ? LivelihoodSurvey.EmploymentType : "--"}</td>
                </tr>
                <tr>
                  <td>Does this meet financial needs</td>
                  <InsertYesOrNoImg bool={LivelihoodSurvey?.FinancialNeedsMet}/>
                </tr>
                <tr>
                  <td>Does your disability affect ability to work</td>
                  <InsertYesOrNoImg bool={LivelihoodSurvey?.DisabilityImpact}/>
                </tr>
                <tr>
                  <td>Want work</td>
                  <InsertYesOrNoImg bool={LivelihoodSurvey?.WorkWanted}/>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default LivelihoodSurvey;