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
                "ShelterAccess" : true,
                "EssentialsAccess" : true,
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
                  <td>Adequate shelter</td>
                  <InsertYesOrNoImg bool={ShelterSurvey?.ShelterAccess}/>
                </tr>
                <tr>
                  <td>Access to essential household items</td>
                  <InsertYesOrNoImg bool={ShelterSurvey?.EssentialsAccess}/>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default ShelterSurvey;