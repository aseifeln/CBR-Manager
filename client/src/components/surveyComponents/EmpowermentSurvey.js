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
              "DisabilityOrganizationMember" : true,
              "DisabilityOrganizations" : "Disability Org1, Org 2, Organizaion 3",
              "AwareDisabilityRights" : true,
              "Influential" : false,
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
                  <td>Is a member of a disability organization</td>
                  <InsertYesOrNoImg bool={EmpowermentSurvey?.DisabilityOrganizationMember}/>
                </tr>
                <tr>
                  <td>List of organizations</td>
                  <td>{EmpowermentSurvey?.DisabilityOrganizations ? EmpowermentSurvey.DisabilityOrganizations : "--"}</td>
                </tr>
                <tr>
                  <td>Aware of rights</td>
                  <InsertYesOrNoImg bool={EmpowermentSurvey?.AwareDisabilityRights}/>
                </tr>
                <tr>
                  <td>Feel able to influence people around</td>
                  <InsertYesOrNoImg bool={EmpowermentSurvey?.Influential}/>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default EmpowermentSurvey;